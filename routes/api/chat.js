const express = require('express');
const { validationResult, check } = require('express-validator');
const auth = require('../../middleware/auth');
const { findById } = require('../../models/Message');
const Message = require('../../models/Message');
const Notification = require('../../models/Notification');
const User = require('../../models/User');
const router = express.Router();


//route POST   api/chat/message/:id
//description  send message
//access       private
router.post('/message/:id', auth, [
    check('text', 'Message cannot be empty.')
    .not()
    .isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { text } = req.body;
    
    try {

        const from = await User.findById(req.user.id).select('-password')
        const to = await User.findById(req.params.id).select('-password')

        let message = new Message({
            user: from.id,
            to: to.id,
            text: text,
            name: from.name
        })
        await message.save()
        
        let notify = await Notification.findOne({user: to.id})
        if (notify) {
            let newNotify = {
                user: to.id,
                from: from.id,
                text: text,
                name: from.name,
                message: message._id
            }
            notify.messager.unshift(newNotify)
            
            await notify.save();
        }
        res.json(message);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

//route GET    api/chat/sent
//description  get received messages
//access       private
router.get('/received/:x', auth, async (req, res) => {
    try {
        const user =  await User.findById(req.user.id).select('-password').select('-twoFactor')
        if (!user) {
            return res.status(401).json({msg: 'User not authorised.'})
        }
        
        let messages = await Message.find({to: req.user.id}).sort({date: -1}).populate('user = to', ['name', 'avatar'])

        const number = -20 - req.params.x
        messages = messages.slice(number)

        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }

})

//route GET    api/chat/sent
//description  get sent messages
//access       private
router.get('/sent/:x', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').select('-twoFactor')
        if (!user) {
            return res.status(401).json({msg: 'User not authorised.'})
        }
        
        let messages = await Message.find({user: user.id}).sort({date: -1}).populate('user = to', ['name', 'avatar'])
        const number = -20 - req.params.x
        messages = messages.slice(number)
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

//route GET    api/chat/notification
//description  get notifications
//access       private
router.get('/notifications', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').select('-twoFactor')
        if (!user) {
            return res.status(401).json({msg: 'User not authorised.'})
        }
        
        const notifies = await Notification.findOne({user: user.id})
        
        
        await notifies.save()
        
        res.json(notifies);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

//route PUT    api/chat/notifications/open
//description  switch open notifications option by userId
//access       private
router.put('/notifications/open', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').select('-twoFactor')
        if (!user) {
            return res.status(401).json({msg: 'User not authorised.'})
        }
        
        const notifies = await Notification.findOne({user: user.id}).populate('user', ['name', 'avatar']).sort({date: -1})
        
        if (notifies.messager && notifies.messager.length > 0) {
            notifies.messager.forEach( message => message.opened = true)
        }
        if (notifies.service && notifies.service.length > 0) {
            notifies.service.forEach( message => message.opened = true)
        }
        
        await notifies.save()

        res.json(notifies);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

//route PUT    api/chat/messages or notifications/see/:id
//description  switch see message option by id
//access       private
router.put('/:feature/see/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').select('-twoFactor')
        if (!user) {
            return res.status(401).json({msg: 'User not authorised.'})
        }

        if(req.params.feature == 'notifications') {
            const notifies = await Notification.findOne({user: req.user.id})
            
            let notify = await notifies.messager.filter(message => message._id.toString() === req.params.id)
            
            if(notify.length === 0) {
                notify = await notifies.service.filter(message => message._id.toString() === req.params.id)
            }

            if(notify[0].user.toString() == user._id) {
                
                notify[0].seen = true
                await notifies.save()
            }
            return res.json(notify[0]);
        }

        if(req.params.feature == 'messages') {
            const message = await Message.findById(req.params.id).populate('user = to', ['name', 'avatar'])
            let notify = await Notification.findOne({user: user._id})
            let notification = notify.messager.filter(element => element.message && element.message == req.params.id)
            
            
            if (message.to && message.to._id.toString() == user._id) {
                
                message.seen = true
                if( notification[0] ) {
                    await notification[0].remove()
                    await notify.save()
                }
                await message.save()
            }
            return res.json(message);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

//route DELETE api/chat/notifications/:id
//description  remove message
//access       private
router.delete('/notifications/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').select('-twoFactor')
        if (!user) {
            return res.status(401).json({msg: 'User not authorised.'})
        }
        
        let notifies = await Notification.findOne({ user: req.user.id })
        
        notifies.messager = notifies.messager.filter(message => message._id.toString() !== req.params.id.toString())
        
        notifies.service = notifies.service.filter(message => message._id.toString() !== req.params.id.toString())

        
        notifies = await notifies.save()
        
        res.json(notifies);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

//route DELETE api/chat/notifications/
//description  remove all notifications
//access       private
router.delete('/notifications', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').select('-twoFactor')
        if (!user) {
            return res.status(401).json({msg: 'User not authorised.'})
        }
        
        let notifies = await Notification.findOne({ user: req.user.id })
        
        notifies.messager = []
        notifies.service = []

        notifies = await notifies.save()
        
        res.json(notifies);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

//route GET    api/chat/:id
//description  get all chat with user
//access       private
router.get('/:id/:x', auth, async (req, res) => {
    
    try {
        
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(401).json({msg: 'User not authorised.'})
        }
        const friend = await User.findById(req.params.id)
        if (!friend) {
            return res.status(401).json({msg: 'User not found.'})
        }

        let sent = await Message.find({ user: user.id }).sort({date: -1}).populate('user = to', ['name', 'avatar'])
        
        sent = sent.filter(message => message.user._id.toString() == user.id.toString() && message.to._id.toString() == friend.id.toString())
        
        let received = await Message.find({ to: user.id }).sort({date: -1}).populate('user = to', ['name', 'avatar'])
        
        received = received.filter(message => message.to._id.toString() == user.id.toString() && message.user._id.toString() == friend.id.toString())
        

            function compareFunction (a, b) {
                let valueA = a.date
                let valueB = b.date
                let comparsion = 0
                if (valueA > valueB) {
                    return comparsion = 1
                }
                if (valueA < valueB) {
                    return comparsion = -1
                }
                return comparsion;
            }
            
            let chat = await received.concat(sent)
            chat = chat.sort(compareFunction)
            const number = -20 - req.params.x
            chat = chat.slice(number)
            chat = [...new Set(chat)]
            res.json(chat)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})


//route POST   api/chat/notification/:id
//description  manual admin option to create notificator
//access       private
router.post('/notification', auth, async(req, res) => {
    
    try {
        const admin = await User.findById(req.user.id)
        if (admin.id.toString() !== '5f3c213f79c5570017ea2728'){
            return res.status(401).json({msg: 'User not authorised.'})
        }
        
        let to = await User.find()

        to.forEach(async to => {
            const text = `Hello ${to.name}.`
            let notify = await Notification.findOne({user: to.id})
            if (notify) {
                let newNotify = {
                    user: to.id,
                    from: 'OnLoud service',
                    text: text
                }
                await notify.service.unshift(newNotify)
        
            } else {
                notify = new Notification({
                    
                user: to.id,
                    service: {
                        user: to.id,
                        from: 'OnLoud service',
                        text: text
                    }
                })
            }
            await notify.save();
        })
        const users = to.map(users => {return {id: users.id, name: users.name}})
        res.json(users);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})
module.exports = router;