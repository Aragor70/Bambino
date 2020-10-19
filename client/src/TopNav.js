import React, { useState, useEffect, Fragment, useRef } from 'react';
import {connect} from 'react-redux';
import Search from './Search';
import {Link} from 'react-router-dom';
import {getProfiles} from './actions/profile';

import PropTypes from 'prop-types';
import { getSongs } from './actions/song';
import { getAuthors } from './actions/author';
import { getNotifies } from './actions/chat';
import NavNotify from './userAccount/NavNotify';


const TopNav = ({auth: {isAuthenticated, loading, user}, menu, setMenu, getProfiles, getNotifies, chat: { messages, notifies }, profile:{ profiles }, getSongs, song:{songs}, getAuthors, author:{authors}, filterUser, setFilterUser, filterSong, setFilterSong, filterAuthor, setFilterAuthor, notify, setNotify}) => {


    const scrollTo = useRef(null)
    useEffect(()=>{
      if(scrollTo.current){
        scrollTo.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'center'})
      }
    },[isAuthenticated])


    useEffect(() => {
            getProfiles();
            getSongs();
            getAuthors();
            getProfiles();
        
    }, []);
    
    
    useEffect(() => {
        if (isAuthenticated, user) {
            getNotifies();
            
        }
        
    }, [messages, isAuthenticated, user]);

    useEffect(() => {

        if( isAuthenticated, user ) {
            const interval = setInterval(() => getNotifies(), 7000);
        
            return () => clearInterval(interval);
        }
    }, []);

    const [searchValue, setSearchValue] = useState([]);


    useEffect(() => {
        const allUsers = profiles.map((profile)=>(profile.user._id ,{id:profile.user._id, avatar:profile.user.avatar ,name:profile.user.name.toLowerCase()}))

        let profile = allUsers.filter(user=> {return user.id , user.avatar, user.name.includes(searchValue.toLowerCase())} )
        
        const tracks = songs.map((track)=> (track._id, {id: track._id, author: track.author, title: track.title.toLowerCase()}))
        
        let track = tracks.filter(song => {return song.id, song.author, song.title.includes(searchValue.toLowerCase()) })

        const singers = authors.map((auth)=> (auth._id, {id: auth._id, author: auth.author.toLowerCase()}))

        let singer = singers.filter(auth => {return auth.id, auth.author.includes(searchValue.toLowerCase()) })

        if(searchValue.length==0) profile = '';
        if(searchValue.length==0) track = '';
        if(searchValue.length==0) singer = '';
        
        setFilterUser(profile);
        setFilterSong(track);
        setFilterAuthor(singer);
    }, [searchValue])

    function compare(a, b) {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        let comparison = 0;
        if(nameA > nameB){
            comparison = 1
        }else if(nameA < nameB){
            comparison = -1
        }
        return comparison
    }
    function compareAuthor(a, b) {
        const nameA = a.author.toLowerCase();
        const nameB = b.author.toLowerCase();

        let comparison = 0;
        if(nameA > nameB){
            comparison = 1
        }else if(nameA < nameB){
            comparison = -1
        }
        return comparison
    }
    function compareTitle(a, b) {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();

        let comparison = 0;
        if(nameA > nameB){
            comparison = 1
        }else if(nameA < nameB){
            comparison = -1
        }
        return comparison
    }


    let sortUsers = [];
    for(let i = 0; i < filterUser.length; i++){
        sortUsers.push({name: filterUser[i].name.toString().toLowerCase(), id: filterUser[i].id, avatar: filterUser[i].avatar})
    }
    sortUsers.sort(compare)

    let sortAuthors = [];
    for(let i = 0; i < filterAuthor.length; i++){
        sortAuthors.push({author: filterAuthor[i].author.toString().toLowerCase(), id: filterAuthor[i].id})
    }
    sortAuthors.sort(compareAuthor)

    let sortTitles = [];
    for(let i = 0; i < filterSong.length; i++){
        sortTitles.push({title: filterSong[i].title.toLowerCase(), id: filterSong[i].id, author: filterSong[i].author})
    }
    sortTitles.sort(compareTitle)


    const handleClick = () => {
        setMenu(!menu)
    }
    
    const userNav = (<>
        <div className="webname"><Link to="/" style={{"color": "black"}}> OnLoud.uk </Link> 
        
        {
            user && <NavNotify setNotify={setNotify} notify={notify} />
        }
        
        
        
        </div>
        
        <div className="grid-header header-user-navi" ref={scrollTo}>
            
            {
                profiles === null || loading ? <p>loading...</p> : <Fragment>
                <input type="text" id="search-user" name="searchData" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder="" />
                
                <div className="search-list">
                    <Fragment>
                    {
                        filterSong.length>0 && <Fragment> <div className="search-bar" ><b>Song title:</b></div>
                            {
                                
                                sortTitles.map(song=> <Link to={`/songs/${song.id}`} onClick={e=>setSearchValue('')} key={song.id} ><div className="search-data" key={song.id}> {song.title} - {song.author} </div></Link>)
                            }
                        </Fragment>
                    }
                    {
                        filterAuthor.length>0 && <Fragment> <div className="search-bar" ><b>Author name:</b></div>
                            {
                                
                                sortAuthors.map(author=> <Link to={`/authors/${author.id}`} onClick={e=>setSearchValue('')} key={author.id} ><div className="search-data" key={author.id}> {author.author} </div></Link>)
                            }
                        </Fragment>
                    }
                    {
                        filterUser.length>0 && <Fragment> <div className="search-bar" ><b>User name:</b></div>
                            {
                                
                                sortUsers.map(user=> <Link to={`/profile/${user.id}`} key={user.id} ><div className="search-data" key={user.id} onClick={e=>setSearchValue('')} >{user.avatar.charAt(0) == "/" ? <img src={user.avatar} height="90%" /> : <img src={`https://s3.eu-west-2.amazonaws.com/onloud-storage/profile/avatar/${user.avatar}`} height="90%" />} {user.name}</div></Link>)
                            }
                        </Fragment>
                    }
                    
                    </Fragment>
                </div>
                </Fragment>
            }
            
        </div>
        <div className="menubtn-user" onClick={e=>handleClick(e)}>
        <img src={ require('./style/open-menu.png') } height="50%" />
        </div></>
    )

    const guestNav = <>
    <div className="webname"><Link to="/" style={{"color": "black"}}> OnLoud.uk </Link></div>
        <div className="grid-header header-user-navi">
            
            {
                songs === null || loading ? <p>loading...</p> : <Fragment>
                <input type="text" id="search-user" name="searchData" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder="" />
                
                <div className="search-list">
                    <Fragment>
                    {
                        filterSong.length>0 && <Fragment> <div className="search-bar" ><b>Song title:</b></div>
                            {
                                
                                sortTitles.map(song=> <Link to={`/songs/${song.id}`} onClick={e=>setSearchValue('')} key={song.id} ><div className="search-data" key={song.id}> {song.title} - {song.author} </div></Link>)
                            }
                        </Fragment>
                    }
                    {
                        filterAuthor.length>0 && <Fragment> <div className="search-bar" ><b>Author name:</b></div>
                            {
                                
                                sortAuthors.map(author=> <Link to={`/authors/${author.id}`} onClick={e=>setSearchValue('')} key={author.id} ><div className="search-data" key={author.id}> {author.author} </div></Link>)
                            }
                        </Fragment>
                    }
                    
                    </Fragment>
                </div>
                </Fragment>
            }
            
        </div>
        <div className="menubtn-user" onClick={e=>handleClick(e)}>
        <img src={ require('./style/open-menu.png') } height="50%" />
        </div>
    </>
    return (
        <>
        {
            !loading && (
                <Fragment>{isAuthenticated ? userNav : guestNav}</Fragment>
            )
        }
        </>
    )
}
TopNav.propTypes = {
    isAuthenticated: PropTypes.bool,
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
    getAuthors: PropTypes.func.isRequired,
    author: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    song: state.song,
    author: state.author,
    chat: state.chat
})

export default connect(mapStateToProps, {getProfiles, getSongs, getAuthors, getNotifies})(TopNav);