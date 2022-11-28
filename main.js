// Tạo function constructor Student giúp khởi tạo nhanh các object student
function Student(
  id,
  name,
  email,
  password,
  dateOfBirth,
  course,
  math,
  physics,
  chemistry
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.dateOfBirth = dateOfBirth;
  this.course = course;
  this.math = math;
  this.physics = physics;
  this.chemistry = chemistry;
}

Student.prototype.calcScore = function () {
  return ((this.math + this.physics + this.chemistry) / 3).toFixed(2);
};

// Tạo array students để lưu trữ danh sách sinh viên
let students = [];

// Hàm init được thực thi khi chương trình được chạy
init();

// =============================================================================================================
function init() {
  // Lấy dữ liệu student từ local storage
  students = JSON.parse(localStorage.getItem("student")) || [];
  // console.log("student trước khi map", students);

  students = students.map((student) => {
    return new Student(
      student.id,
      student.name,
      student.email,
      student.password,
      student.dateOfBirth,
      student.course,
      student.math,
      student.physics,
      student.chemistry
    );
  });
  // console.log("Student sau khi map", students);

  display(students);
}

function addStudent() {
  // B1 DOM lấy thông tin từ các input, và kiểm tra hợp lệ
  let id = dom("#txtMaSV").value;
  let name = dom("#txtTenSV").value;
  let email = dom("#txtEmail").value;
  let password = dom("#txtPass").value;
  let dateOfBirth = dom("#txtNgaySinh").value;
  let course = dom("#khSV").value;
  let math = +dom("#txtDiemToan").value;
  let physics = +dom("#txtDiemLy").value;
  let chemistry = +dom("#txtDiemHoa").value;

  let isValid = validateForm();
  // kiểm tra nếu form không hợp lệ thì kết thúc hàm
  if (!isValid) {
    return;
  }

  //   B2 tạo object student chứa các thông tin trên
  let student = new Student(
    id,
    name,
    email,
    password,
    dateOfBirth,
    course,
    math,
    physics,
    chemistry
  );
  console.log(student);

  //   B3 Thêm object vào array students và lưu trữ vào localStorage
  students.push(student);
  localStorage.setItem("student", JSON.stringify(students));

  //   B4 Hiển thị ra giao diện
  display(students);

  //   B5: Reset form
  resetForm();
}

function deleteStudent(studentId) {
  // studentId là id của sinh viên muốn xóa khỏi array students

  //   // cách 1: dùng studentId tìm index bằng hàm findIndex và xóa bằng hàm splice
  //   let index = students.findIndex((student) => {
  //     // return về giá trị boolean
  //     // nếu true, trả ra giá trị index của phần tử này
  //     // nếu là false thì tiếp tục duyệt qua phần tử tiếp theo
  //     // trả ra -1 nếu không có bất kì phần tử return về true
  //     return student.id === studentId;
  //   });
  //   if (index !== -1) {
  //     students.splice(index, 1);
  //   }

  //   Cách 2 dùng hàm filter
  students = students.filter((student) => {
    return student.id !== studentId;
  });

  // Lưu trữ vào local storage sau khi xóa sinh viên
  localStorage.setItem("student", JSON.stringify(students));

  //  Sau khi thay đổi dữ liệu của mảng array ta cần gọi hàm display và truyền vào array students để cập nhật lại giao diện
  display(students);
}

function searchStudent() {
  // DOM
  let searchValue = dom("#txtSearch").value;

  // if (!searchValue) {
  //   display(students);
  //   return;
  // }

  searchValue = searchValue.toLowerCase();

  // Dùng hàm filter để lọc ra các sinh viên có tên khớp với giá trị tìm kiếm
  // Lưu ý: cần tạo ra một biến mới để gắn kết quả từ hàm filter, vì nếu sử dụng biến students sẽ bị mất dữ liệu
  let newStudent = students.filter((student) => {
    let name = student.name.toLowerCase();
    // a.includes(b) là hàm kiểm tra xem b có là chuỗi con của a hay không, kết quả trả ra true hoặc false
    return name.includes(searchValue);
  });

  // Gọi hàm display và truyền vào array mới để hiển thị lên giao diện
  display(newStudent);
}

function selectStudent(studentId) {
  // find hoạt động tương tự findIndex, tuy nhiên thay vì trả về index nó trả về giá trị của phần tử
  // nếu không tìm thấy trả về undefined
  let student = students.find((student) => {
    return student.id === studentId;
  });

  if (!student) {
    return;
  }

  // Tham số student là object chứa thông tin của sinh viên mà ta muốn cập nhật
  // Dùng object student để fill thông tin lên các input
  dom("#txtMaSV").value = student.id;
  dom("#txtTenSV").value = student.name;
  dom("#txtEmail").value = student.email;
  dom("#txtPass").value = student.password;
  dom("#txtNgaySinh").value = student.dateOfBirth;
  dom("#khSV").value = student.course;
  dom("#txtDiemToan").value = student.math;
  dom("#txtDiemLy").value = student.physics;
  dom("#txtDiemHoa").value = student.chemistry;

  // khi cập nhật không được thay đổi mã sinh viên
  dom("#txtMaSV").disabled = true;
  dom("#btnThem").disabled = true;
}

function updateStudent() {
  // B1 DOM lấy thông tin từ các input
  let id = dom("#txtMaSV").value;
  let name = dom("#txtTenSV").value;
  let email = dom("#txtEmail").value;
  let password = dom("#txtPass").value;
  let dateOfBirth = dom("#txtNgaySinh").value;
  let course = dom("#khSV").value;
  let math = +dom("#txtDiemToan").value;
  let physics = +dom("#txtDiemLy").value;
  let chemistry = +dom("#txtDiemHoa").value;

  //   B2 tạo object student chứa các thông tin trên
  let student = new Student(
    id,
    name,
    email,
    password,
    dateOfBirth,
    course,
    math,
    physics,
    chemistry
  );

  // B3 cập nhập thông tin sinh viên, và lưu trữ vào local storage
  let index = students.findIndex((item) => item.id === student.id);
  students[index] = student;
  localStorage.setItem("student", JSON.stringify(students));

  // B4 hiển thị ra giao diện
  display(students);

  // B5 reset form
  resetForm();
}
// =============================================================================================================

// Hàm display nhận vào một tham số là một array students (danh sách sinh viên), dùng array này để hiển thị thông tin sinh viên ra table
function display(students) {
  // Cách 1: Dùng vòng for duyệt mảng và tạo ra một chuỗi html
  //   let html = "";
  //   for (let i = 0; i < students.length; i++) {
  //     let student = students[i];
  //     html += `
  //         <tr>
  //             <td>${student.id}</td>
  //             <td>${student.name}</td>
  //             <td>${student.email}</td>
  //             <td>${student.dateOfBirth}</td>
  //             <td>${student.course}</td>
  //             <td>${student.calcScore()}</td>
  //         </tr>
  //     `;
  //   }

  //   Cách 2: sử dụng phương thức reduce dành cho mảng để hiển thị giá trị
  let html = students.reduce((result, student) => {
    return (
      result +
      `
    <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.dateOfBirth}</td>
        <td>${student.course}</td>
        <td>${student.calcScore()}</td>
        <td>
             <button 
               class="btn btn-success"
               onclick="selectStudent('${student.id}')"
            >
               Edit
            </button>
            <button 
                class="btn btn-danger"
                onclick="deleteStudent('${student.id}')"
            >
                Delete
            </button>
        </td>
    </tr>
    `
    );
  }, "");

  //   DOM tới tbody và gắn chuỗi html vừa tạo
  dom("#tbodySinhVien").innerHTML = html;
}

// Hàm resetForm dùng để set giá trị của các input về chuỗi rỗng
function resetForm() {
  dom("#txtMaSV").value = "";
  dom("#txtTenSV").value = "";
  dom("#txtEmail").value = "";
  dom("#txtPass").value = "";
  dom("#txtNgaySinh").value = "";
  dom("#khSV").value = "";
  dom("#txtDiemToan").value = "";
  dom("#txtDiemLy").value = "";
  dom("#txtDiemHoa").value = "";

  dom("#txtMaSV").disabled = false;
  dom("#btnThem").disabled = false;
}

function dom(selector) {
  return document.querySelector(selector);
}

// =================================== Validation ==========================================

// Hàm kiểm tra xem input Mã SInh viên có hợp lệ hay không nếu có return về true, không return về false
function validateId() {
  let id = dom("#txtMaSV").value;
  let spanEl = dom("#spanMaSV");
  // kiểm tra rỗng hay không
  if (!id) {
    spanEl.innerHTML = "Mã Sinh viên không được để trống";
    return false;
  }
  // kiểm tra dộ dài kí tự
  if (id.length < 5 || id.length > 8) {
    spanEl.innerHTML = "Mã Sinh viên phải từ 5 đến 8 kí tự";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

// Hàm kiểm tra tên sinh viên
function validateName() {
  let name = dom("#txtTenSV").value;
  let spanEl = dom("#spanTenSV");
  if (!name) {
    spanEl.innerHTML = "Tên Sinh viên không được để trống";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

// Hàm kiểm tra email
function validateEmail() {
  let email = dom("#txtEmail").value;
  let spanEl = dom("#spanEmailSV");

  if (!email) {
    spanEl.innerHTML = "Email không được để trống";
    return false;
  }
  // Kiểm tra định dạng email
  // regex = regular expression dùng để phân tích cú pháp, sự trùng khớp
  let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(email)) {
    spanEl.innerHTML = "Email không đúng định dạng";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}

// Hàm kiểm tra password
function validatePassword() {
  let password = dom("#txtPass").value;
  let spanEl = dom("#spanMatKhau");

  if (!password) {
    spanEl.innerHTML = "Mật khẩu không được để trống";
    return false;
  }
  // Kiểm tra định dạng mật khẩu(1 số, 1 chữ hoa 1 chữ thường và ít nhất 8 kí tự)
  let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regex.test(password)) {
    spanEl.innerHTML = "Mật Khẩu không đúng định dạng";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

// hàm kiểm tra xem form có hợp lệ hay không, return true/false
function validateForm() {
  // kĩ thuật đặt cờ hiệu, mặc đinh ban đầu xem như form hợp lệ
  let isValid = true;

  isValid =
    validateId() & validateName() & validateEmail() & validatePassword();

  if (!isValid) {
    alert("Form không hợp lệ ");
    return false;
  }

  return true;
}
