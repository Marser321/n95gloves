export const blurDataUrl =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>" +
      "<defs>" +
      "<radialGradient id='g' cx='50%' cy='50%' r='50%'>" +
      "<stop offset='0%' stop-color='#2BFF4F' stop-opacity='0.35'/>" +
      "<stop offset='100%' stop-color='#030303' stop-opacity='1'/>" +
      "</radialGradient>" +
      "</defs>" +
      "<rect width='24' height='24' fill='url(#g)'/>" +
      "</svg>"
  );
