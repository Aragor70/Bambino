import React from 'react';

const About = () => {


    return(
        <div>
            <div className="about-navigator-group">
                <div className="about-navigator-btn">welcome .</div>
                <div className="about-navigator-btn">community .</div>
                <div className="about-navigator-btn">website team .</div>
            </div>
            <div className="about-bar">
                <p>Discover everything you need to get inspired, get involved.</p>
                
                <p>Are you here for the first time? </p>
            </div>
            <div className="about-posts">
                <div className="about-post">
                    <h1>Discover albums of your favorite Artists.</h1>
                    <p>Do you have a favorite artist?</p> 
                    <p>Be sure that you know all his songs album.</p>
                    <p>Use searchig nav to make it easy.</p>
                </div>
                
                <div className="about-post">
                    <h1>Share your knowledge.</h1>
                    <p>You already know the artist but you could not find his content here.</p>
                    <p>Make sure that everyone else meet his better.</p>
                    <p>Share inspiration with other users.</p>
                    <p>Insert your interpteration or comments.</p>
                    <p>Be well aware to complete empty spaces.</p>
                </div>
            </div>
        </div>
    );
}
export default About;