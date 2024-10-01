import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../redux/slices/imagesSlice";
import {
  Box,
  Button,
  Modal,
  Backdrop,
  Fade,
  ImageList,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import Image from "./Image";
// import ImageComponent from "./ImageComponent";

const ImageLibrary = () => {
  const [open, setOpen] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const loading = useSelector((state) => state.images.loading);
  console.log("loading2704: ", loading);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSearchChange = (e) => {
    const { value: searchQuery } = e.target;
    setSearchQuery(searchQuery);
    debouncedSearch(searchQuery.trim()); // Call the debounced function
  };
  const debouncedSearch = useCallback(
    _.debounce((query) => {
      if (query === "") {
        dispatch(
          getImages({
            type: "random",
          })
        )
          .unwrap()
          .then((res) => {
            console.log("Unsplash images repsonse: ", res);
            setImagesList(res || []);
          });
      } else {
        dispatch(
          getImages({
            type: "search",
            query,
          })
        )
          .unwrap()
          .then((res) => {
            console.log("Unsplash images repsonse: ", res);
            setImagesList(res?.results || []);
          });
      }
    }, 500),
    []
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "85vw",
      sm: "90vw",
      md: "75vw",
      lg: "65vw",
      xl: "55vw",
    },
    height: "80vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "1em",
    "&:focus": {
      border: "none",
      outline: "none",
    },
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImages({}))
      .unwrap()
      .then((res) => {
        console.log("Unsplash images repsonse: ", res);
        setImagesList(res || []);
      });
  }, []);
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TextField
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search unsplaxh images..."
              sx={{
                width: "100%",
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Box
              position="relative"
              sx={{
                maxHeight: "90%",
                overflowY: "auto",
                marginTop: "1em",
              }}
            >
              {loading && (
                <CircularProgress
                  width={30}
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  color="secondary"
                />
              )}
              <ImageList variant="masonry" cols={4} gap={2}>
                {imagesList.map(({ id, urls, width, height, description }) => {
                  return (
                    <Image
                      key={id}
                      sx={{
                        cursor: "pointer",
                      }}
                      src={urls.full}
                      width={width}
                      height={height}
                      alt={description}
                    />
                  );
                })}
              </ImageList>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ImageLibrary;
