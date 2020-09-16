const changeImgCommand = (event) => {
  let target = event.target;
  if (target.matches('.command__photo')) {
    [target.src, target.dataset.img] = [target.dataset.img, target.src];
  }
};

export default changeImgCommand;