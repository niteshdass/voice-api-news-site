import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import logo from './images/logo.png';
import { NewsCards, Modal } from './components';
import useStyles from './styles';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: '64370f4c903e66c5b517887fefa45c1b2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="https://scontent.fzyl1-1.fna.fbcdn.net/v/t1.0-9/107381127_2730939843862486_4413105804306548074_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_eui2=AeHKkGc7Msttw6aPOVcNINIFbws9n3-qjPxvCz2ff6qM_C7qUrUn9hNlukv54LppCdT5aQ1Gzitvn0zcFtd3aXQF&_nc_ohc=lA4G5NPDbW4AX-t7sqY&_nc_ht=scontent.fzyl1-1.fna&oh=8582750ff583041c23c9dd601ac90dbc&oe=5F5B96EF" className={classes.alanLogo} alt="logo" />
     
        <h3 className={classes.alanLogo} >Hello, this is a Build a Voice Controlled React News Application</h3>
<h5 className={classes.alanLogo} >pleasse look the icon,and plz click and say to command
  like:give me the news from abc/ncc/ news,what\'s up men,show|what is|tell me|what's|what are|what're|read the recent|latest|
  news|headlines   Go Back , Open The Article num 4,3

</h5>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://github.com/niteshdass">Nitesh Das</a> -
            <a className={classes.link} href="https://www.facebook.com/bindaas11/">Contact Me</a>
          </Typography>
          
        </div>
      ) : null}
    </div>
  );
};

export default App;









