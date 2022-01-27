import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { videoSearch, userSearch } from "../../actions/search";
import ChannelRow from "./ChannelRow";
import VideoRow from "./VideoRow";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import "./SearchPage.css";
import { IconButton, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gotChannels, setGotChannels] = useState([]);
  const [gotVideos, setGotVideos] = useState([]);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const searchTerm = location.pathname.split("/")[2];
    userSearch({ searchTerm })
      .then((res) => {
        if (!res.data) {
          setError("No channel found");
          setLoading(false);
        } else {
          setError("");
          console.log(res.data);
          setGotChannels(res.data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
    videoSearch({ searchTerm })
      .then((r) => {
        if (!r.data) {
          setError("No video found");
          setLoading(false);
        } else {
          setError("");
          console.log(r.data);
          setGotVideos(r.data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [location]);

  return (
    <div className="searchPage">
      {loading && <CircularProgress color="inherit" />}
      {!loading && (
        <>
          <div className="searchPage__filter">
            <IconButton>
              <TuneOutlinedIcon />
            </IconButton>
            <h2>FILTER</h2>
          </div>
          <hr />
          <h4 style={{ marginLeft: "2%", marginBottom: "15px" }}>Channels</h4>
          <div>
            {gotChannels.map((c, i) => {
              return (
                <>
                  <ChannelRow
                    image={
                      c.image
                        ? c.image
                        : "https://yt3.ggpht.com/ytc/AAUvwnjsRdGwYPgicDHjSi7EeQcHgUwkpT88HDCs4Jy_=s88-c-k-c0x00ffffff-no-rj"
                    }
                    channel={c.name}
                    verified
                    subs={c.subscribers}
                    key={i}
                  />
                  <br />
                </>
              );
            })}
          </div>
          <hr />
          <h4 style={{ marginLeft: "2%", marginBottom: "15px" }}>Videos</h4>
          <div>
            {gotVideos.map((v, i) => {
              return (
                <VideoRow
                  key={i}
                  views={v.views}
                  subs="987K"
                  desc={v.description}
                  timestamp={v.createdAt}
                  channel={v.writer}
                  videoId={v.videoId}
                  title={v.title}
                  image={
                    v.image
                      ? v.image
                      : "https://scontent-syd2-1.xx.fbcdn.net/v/t1.6435-9/55543832_873197476361445_425512666396622848_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=e3f864&_nc_ohc=lq4G_5DAUF0AX8LH3Hh&_nc_ht=scontent-syd2-1.xx&oh=00_AT9Emh2fIOu74xU5cHwfG6O4eDoipBGqfW0zK4kaKDKSlQ&oe=6215F378"
                  }
                />
              );
            })}
          </div>
        </>
      )}
      {error && (
        <Alert
          style={{ width: "50%", marginLeft: "24%", marginTop: "5%" }}
          severity="error"
        >
          {error}.
        </Alert>
      )}
    </div>
  );
};

export default SearchPage;
