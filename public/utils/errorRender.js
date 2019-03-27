export function ShowErrMassage(errBlock, errList) {
  errBlock.innerHTML = '';
  errList.forEach((elm) => {
    console.log(elm, errList.length);
    errBlock.innerHTML += `${elm}<br>`;
  });
}
