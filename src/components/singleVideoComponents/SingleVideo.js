import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSingleVideo } from "../../actions/video";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactWebMediaPlayer from "react-web-media-player";
import SmallVideoPlayer from "./SmallVideoPlayer";
import { listVideos } from "../../actions/video";
import LikeCommentSubscribeSystem from "./LikeCommentSubscribeSystem";

const SingleVideo = () => {
  const [loading, setLoading] = useState(false);
  const [gotData, setGotData] = useState({});
  const [allVideos, setAllVideos] = useState([]);

  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const videoId = location.pathname.split("/")[3];
    getSingleVideo({ videoId })
      .then((res) => {
        setGotData(res.video[0]);
        listVideos()
          .then((data) => {
            setAllVideos(data.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [location.pathname]);

  return (
    <div className="singleVideo">
      {loading && <CircularProgress color="inherit" />}
      {!loading && (
        <div style={{ display: "flex" }}>
          <div style={{ flexDirection: "column" }}>
            <ReactWebMediaPlayer
              title={`${gotData.title} | ${gotData.writer && gotData.writer}`}
              width="1050"
              height="500"
              video={gotData.filePath}
              type="video/mov"
            />
            <LikeCommentSubscribeSystem
              _id={gotData._id}
              desc={gotData.description}
              videoId={gotData.videoId}
              title={gotData.title}
              writer={gotData.writer}
              likes={gotData.likes}
              timestamp={gotData.createdAt}
              views={gotData.views}
              dislikes={gotData.dislikes}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {allVideos.map((v) => {
              return (
                <SmallVideoPlayer
                  key={v._id}
                  views={v.views}
                  title={v.title}
                  channel={v.writer}
                  timestamp={v.createdAt}
                  image={
                    v.thumbnail
                      ? v.thumbnail
                      : "https://scontent-syd2-1.xx.fbcdn.net/v/t1.6435-9/55543832_873197476361445_425512666396622848_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=e3f864&_nc_ohc=lq4G_5DAUF0AX8LH3Hh&_nc_ht=scontent-syd2-1.xx&oh=00_AT9Emh2fIOu74xU5cHwfG6O4eDoipBGqfW0zK4kaKDKSlQ&oe=6215F378"
                  }
                  channelImage={v.writerImg ? v.writerImg : null}
                  videoId={v.videoId}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleVideo;
