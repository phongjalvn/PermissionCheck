export const status = [
  {text: "Not available", value: 'notavailable'},
  {text: "Checking", value: 'checking'},
  {text: "Ok", value: 'checking'},
  {text: "Need fix - Not start", value: 'needfix'},
  {text: "Need fix - In Progress", value: 'needfixdoing'},
]
export const roles = [
  {text: "Mod Hub A", value: 'moda'},
  {text: "Mod Hub B", value: 'modb'},
  {text: "View Only", value: 'onlyview'},
]

const _actions = [
  "Tạo lộ trình",
  "Hủy lộ trình",
  "Hủy vận đơn",
  "View vận đơn",
  "Xác nhận giao hàng cho 3PLs",
  "Xác nhận hoàn hàng",
  "In nhãn lộ trình",
  "Xác nhận nhập hàng về kho",
  "Xác nhận hoàn hàng",
  "View vận đơn",
  "In nhãn lộ trình",
  "Hủy vận đơn",
  "Xác nhận hoàn hàng",
  "View vận đơn",
  "Tạo lộ trình",
  "In nhãn lộ trình",
]

export const getActions = () => {
  let actions = [];
  _actions.forEach((e, i) => {
    actions = [...actions, {text: e, value: i}];
  });
  return actions;
}

export const blStates = [
  {value: "init", text: "Khởi tạo"},
  {value: "shipping", text: "Đang giao"},
  {value: "delivering", text: "Đang trên đường"},
  {value: "delivered", text: "Đã giao thành công"},
  {value: "returning", text: "Đang hoàn hàng"},
  {value: "returned", text: "Đã hoàn hàng"},
  {value: "partial_returning", text: "Đang hoàn 1 phần"},
  {value: "partial_returned", text: "Đã hoàn 1 phần"},
  {value: "cancelled", text: "Đã hủy"},
  {value: "retry", text: "Giao lại"},
]
export const transportStates = [
  {value: "confirmed",text: "Chờ lấy hàng"},
  {value: "shipping",text: "Đang giao hàng"},
  {value: "ok",text: "Giao thành công"},
  {value: "partial_ok",text: "Giao thành công"},
  {value: "retry",text: "Đang giao lại"},
  {value: "cancelled",text: "Lộ trình bị huỷ"},
  {value: "returning",text: "Đang hoàn hàng"},
  {value: "returned",text: "Đã hoàn hàng"},
]