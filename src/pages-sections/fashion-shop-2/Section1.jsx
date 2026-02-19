import { Box, Container } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import { CarouselCard1 } from "components/carousel-cards";
// ======================================================

const Section1 = ({
  carouselData
}) => {
  return <Box sx={{
    mb: 8,
    mt: 0,
    background: "linear-gradient(180deg, rgba(11, 11, 15, 0.38) 0%, rgba(11, 11, 15, 0.6) 100%)",
    backdropFilter: "blur(6px)"
  }}>
      <Container sx={{
      pt: {
        xs: 1,
        sm: 0
      },
      pb: {
        xs: 6,
        sm: 3
      }
    }}>
        <Carousel spacing="0px" totalSlides={2} infinite={true} showDots={true} autoPlay={false} visibleSlides={1} showArrow={false}>
          {carouselData.map((item, ind) => <CarouselCard1 key={ind} buttonColor="primary" title={item.title} imgUrl={item.imgUrl} buttonLik={item.buttonLik} buttonText={item.buttonText} description={item.description} />)}
        </Carousel>
      </Container>
    </Box>;
};
export default Section1;
