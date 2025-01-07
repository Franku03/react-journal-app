import { Box, ImageList, ImageListItem } from "@mui/material";


export const ImageGallery = () => {

  return (
    <Box sx={{ width: '100%', height: 300, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={4} gap={8} >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );

}

const itemData = [
  {
    img: 'https://i.pinimg.com/1200x/70/2a/0b/702a0b9e3f97c2671d0a5a19a90da791.jpg',
    title: 'Bed',
  },
  {
    img: 'https://i.pinimg.com/1200x/d5/c4/2f/d5c42ffc5162cd01accc0c5d5cd623e7.jpg',
    title: 'Books',
  },
  {
    img: 'https://i.pinimg.com/1200x/e9/cf/6b/e9cf6bab10945e1048dd41199e8a477a.jpg',
    title: 'Sink',
  },
  {
    img: 'https://i.pinimg.com/1200x/4d/12/98/4d1298d80d7b64b9323ee9e4cfed0fe1.jpg',
    title: 'Kitchen',
  },
  {
    img: 'https://i.pinimg.com/736x/9a/60/df/9a60df378ebcfc26eced7468412bfe28.jpg',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];

