//Tạo lớp đối tượng Product
function Product(_id, _name, _price, _screen, _frontCamera, _backCamera, _img, _type, _desc) {
  this.id = _id;
  this.name = _name;
  this.price = _price;
  this.screen = _screen;
  this.backCamera = _backCamera;
  this.frontCamera = _frontCamera;
  this.img = _img;
  this.type = _type;
  this.desc = _desc;
}