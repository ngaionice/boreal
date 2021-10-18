import axios from "axios";

const instance = (searchParams) => {
  const { session } = searchParams;
  return axios.create({
    baseURL: `https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/${session}/courses/`,
    headers: {},
    params: {
      ...searchParams,
    },
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
