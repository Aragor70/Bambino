import React, { useState } from 'react';
import AddNewsletter from './AddNewsletter';

const Newsletter = () => {

    const [newsletterView, setNewsletterView] = useState(false)

    return (
        <div>
            <div className="newsletter-bar">
                
                <p>Newsletter</p>
                <p>Give us that pleasure to share news with you.</p>
                
            </div>
            <div className="newsletter-posts">
                    <div className="newsletter-post">
                        <h1 onClick={e => setNewsletterView(!newsletterView)}>Subscribe</h1>
                        <p>And receive notifications about events</p>
                    </div>
                {
                    newsletterView && <AddNewsletter setNewsletterView={setNewsletterView} newsletterView={newsletterView} />
                }
                {
                    newsletterView && <div className="addShadow" ></div>
                }
            </div>
        </div>

    );
}
export default Newsletter;