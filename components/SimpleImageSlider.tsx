import React, { useState, useRef, useEffect } from "react";
import { View, Animated, Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const SimpleImageSlider = ({ courses }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeIndex === courses.length - 1) {
        slidesRef.current.getNode().scrollTo({ x: 0, animated: false });
        setActiveIndex(0);
      } else {
        slidesRef.current
          .getNode()
          .scrollTo({ x: (activeIndex + 1) * screenWidth, animated: true });
        setActiveIndex((prevIndex) => prevIndex + 1);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex, courses.length]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View>
      <Animated.ScrollView
        ref={slidesRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {courses.map((course, index) => (
          <Animated.View
            key={index}
            style={[
              styles.slide,
              {
                transform: [
                  {
                    scale: scrollX.interpolate({
                      inputRange: [
                        (index - 1) * screenWidth,
                        index * screenWidth,
                        (index + 1) * screenWidth,
                      ],
                      outputRange: [0.9, 1, 0.9],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
            ]}
          ></Animated.View>
        ))}
      </Animated.ScrollView>
      <View style={styles.pagination}>
        {courses.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex ? styles.paginationDotActive : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: -20,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: 16,
  },
});

export default SimpleImageSlider;
