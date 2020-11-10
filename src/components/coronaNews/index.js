import React, { useEffect, useState } from 'react';
// import moment from 'moment';
import app from '../../services/firebase';
import 'firebase/database';

const convertTanggalKeLocale = (tanggal) => {
  const tanggalLokal = new Date(tanggal).toLocaleString('id-ID', {
    dateStyle: 'full',
  });
  return tanggalLokal;
};

const CoronaNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      setNews(firebaseNews.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>data corona</h2>
      {isLoading ? <p>loading</p> : <p />}
      <div className="corona__news-wrapper">
        {news.map((newsItem) => {
          return (
            <div>
              <h1 style={{ marginTop: '2em' }}>
                {convertTanggalKeLocale(newsItem.date)}
              </h1>
              <div className="news-wrapper">
                {newsItem.activity.map((activityItem) => {
                  return (
                    <ul className="container_status">
                      <a
                        href="href={activityItem.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong className="container_title">
                          {activityItem.title}
                        </strong>
                      </a>

                      <p className="news-description">{activityItem.desc}</p>
                    </ul>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h2>data corona</h2>
  //     {isLoading ? <p>loading</p> : <p>{news.date}</p>}
  //   </div>
  // );

  // console.log(news);
  // if (isLoading) {
  //   return <div>loading</div>;
  // }

  // let html = '';
  // for (let i = 0; i < news.length; i++) {
  //   html += `<div class="ant-timeline-item-content">${moment(
  //     news[i].date
  //   ).calendar()}<ul class="container_status">`;
  //   for (let k = 0; k < news[i].activity.length; k++) {
  //     html += `<li><a href="${news[i].activity[k].url}" target="_blank" rel="noopener noreferrer"><strong class="container_title">
  //     ${news[i].activity[k].title}
  //     </strong></a></li>`;
  //     if (news[i].activity[k].desc !== undefined) {
  //       html += `<p>${news[i].activity[k].desc}</p>`;
  //     }
  //     html += '</ul></div>';
  //   }
  // }
  // return <div className="content" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default CoronaNews;
