import React, { useEffect, useState } from "react";
import "./RecommendedVideos.css";
import VideoCard from "./VideoCard";
import { listVideos } from "../../actions/video";
import moment from "moment";

const RecommendedVideos = () => {
  const [gotData, setGotData] = useState([]);

  useEffect(() => {
    listVideos()
      .then((res) => {
        setGotData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="recommendedVideos">
      <h2>Recommended</h2>
      <div className="recommendedVideos__videos">
        {gotData &&
          gotData.map((v, i) => {
            return (
              <VideoCard
                key={i}
                image="https://scontent-syd2-1.xx.fbcdn.net/v/t1.6435-9/55543832_873197476361445_425512666396622848_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=e3f864&_nc_ohc=lq4G_5DAUF0AX8LH3Hh&_nc_ht=scontent-syd2-1.xx&oh=00_AT9Emh2fIOu74xU5cHwfG6O4eDoipBGqfW0zK4kaKDKSlQ&oe=6215F378"
                title={v.title}
                channel={v.writer}
                videoId={`${v.videoId}`}
                views={`${v.views} views`}
                timestamp={moment(v.createdAt).fromNow()}
                channelImage="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_686d45bc0ce48af2c96f47849207d61d/shootsta.png"
              />
              
            );
          })}
      </div>
    </div>
  );
};

export default RecommendedVideos;
