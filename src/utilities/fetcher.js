import axios from "axios";

const instance = () => {
  return axios.create({
    baseURL:
      "https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/",
    headers: {},
  });
};

// vaild params

// org:
// code:
// section:
// studyyear:
// daytime:
// weekday:
// prof:
// breadth:
// deliverymode:
// online:
// waitlist:
// available:
// fyfcourse:
// title:

export { instance as getSearchInstance };
