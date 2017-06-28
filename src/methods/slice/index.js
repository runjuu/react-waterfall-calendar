const slice = (month = [], count = 0) => {
  slice.month = [];

  for (let times = month.length / count; times > 0; times -= 1) {
    slice.month.push(
      month.slice((times - 1) * count, times * count),
    );
  }

  return slice.month.reverse();
};

export default slice;
