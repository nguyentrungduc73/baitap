let localData = localStorage.getItem("listSP");

let taskList = localData ? JSON.parse(localData) : [];

// function update(id) {
//   let task = taskList.find((item) => {
//     return item.id == id;
//   });

// $(".modal-title").html(task.id);
// $(".modal-body").html(task.title);
// $("#update-modal").modal("show");
// }

// function deleteTask(id) {
//   $(`#task_${id}`).remove();
// }
function add() {
  const itemId = $("#inp-id").val();
  const itemSp = $("#inp-tenSP").val();
  const quantitySp = $("#inp-quantity").val();
  const dateSp = $("#inp-date").val();
  // $("#inp-id").val("");
  // $("#inp-title").val("");
  const itemabc = {
    id: itemId,
    tenSp: itemSp,
    quantity: quantitySp,
    date: dateSp,
  };

  let index = taskList.findIndex((item) => {
    return item.id == itemabc.id;
  });
  if (itemId.length < 1) {
    alert("vui long nhap ID");
  } else if (itemSp.length < 1) {
    alert("vui long nhap Ten SP");
  } else if (quantitySp.length < 1) {
    alert("vui long nhap so luong sp");
  } else if (dateSp.length < 1) {
    alert("vui long nhap ngay thang");
  } else {
    if (index >= 0) {
      taskList.splice(index, 1, itemabc);
      console.log();
      render();
    } else {
      taskList.push(itemabc);
      render();
      localStorage.setItem("listSP", JSON.stringify(taskList));
    }
  }

  localStorage.setItem("list", JSON.stringify(taskList));
}

function render() {
  let table = `
<tr>
  <td>ID</td>
  <td>TenSP</td>
  <td>SỐ lượng</td>
  <td>Ngày tháng</td>
  <td>action</td>
</tr>`;
  taskList.forEach((item) => {
    table += `
  <tr class = "data-row">
      <td>${item.id}</td>
      <td>${item.tenSp} </td>
      <td>${item.quantity}</td>
      <td>${item.date}</td>
      <td>
      <button onClick="openEditModal('${item.id}')">
      <i class="fa-solid fa-wrench"></i>
      </button>
      <button onClick ="openDeleteModal('${item.id}')">
      <i class="fa-solid fa-trash"></i>
      </button>
      </td>
  
  </tr>`;
  });
  document.getElementById("task-table").innerHTML = table;
}

function openDeleteModal(id) {
  const task = taskList.find((item) => {
    return item.id == id;
  });

  $(".modal-title").html(task.id);
  $(".modal-body").html("ban co chac muon xoa");
  $("#open-delete").modal("show");
  document.querySelector("#btn-delete").addEventListener("click", function (e) {
    taskList.forEach((item, index) => {
      if (item.id == id) {
        taskList.splice(index, 1);
        render();
        localStorage.setItem("listSP", JSON.stringify(taskList));
      }
    });
    $("#open-delete").modal("hide");

    console.log(taskList);
  });
}
function openEditModal(id) {
  const task = taskList.find((item) => {
    return item.id == id;
  });

  $(".modal-title-edit").html(task.id);
  $(".modal-body-edit").html(
    `<input class="inpEditTenSp" type="text" value = "${task.tenSp}"/>
    <input class="inpEditQuantity" type="number" value = "${task.quantity}"/>
    <input class="inpEditDate" type="date" value = "${task.date}"/>`
  );
  $("#open-edit").modal("show");
  console.log(task.tenSp);
}
$("#btn-edit").click(function () {
  let idFix = $(".modal-title-edit").html();
  let taskfix = taskList.find((element) => {
    return element.id == idFix;
  });

  let editInputTenSp = document.querySelector(".inpEditTenSp").value;
  let editInputQuantity = document.querySelector(".inpEditQuantity").value;
  let editInputDate = document.querySelector(".inpEditDate").value;

  taskfix.tenSp = editInputTenSp;
  taskfix.quantity = editInputQuantity;
  taskfix.date = editInputDate;
  localStorage.setItem("listSP", JSON.stringify(taskList));

  render();

  $("#open-edit").modal("hide");
});
let countQuantity = 0;
$(".text-bg-primary").click(function () {
  countQuantity++;
  if (countQuantity % 2 == 1) {
    taskList.sort((a, b) => a.quantity - b.quantity);
    console.log(taskList);
    render();
  }
  if (countQuantity % 2 == 0) {
    taskList.sort((a, b) => b.quantity - a.quantity);
    render();
  }

  localStorage.setItem("listSP", JSON.stringify(taskList));
});

let countDate = 0;
$(".text-bg-secondary").click(function () {
  countDate++;
  console.log(countDate);
  if (countDate % 2 == 1) {
    taskList.sort((a, b) => {
      if (a.date > b.date) {
        return -1000;
        r;
      }
    });
    render();
  }
  if (countDate % 2 == 0) {
    taskList.sort((a, b) => {
      if (b.date > a.date) {
        return -10000;
      }
    });
    render();
  }
  localStorage.setItem("listSP", JSON.stringify(taskList));
});

let countName = 0;
$(".text-bg-success").click(function () {
  countName++;
  if (countName % 2 == 1) {
    taskList.sort((a, b) => {
      if (a.tenSp > b.tenSp) {
        return -1000;
        r;
      }
    });
    render();
  }
  if (countName % 2 == 0) {
    taskList.sort((a, b) => {
      if (b.tenSp > a.tenSp) {
        return -10000;
      }
    });
    render();
  }
  localStorage.setItem("listSP", JSON.stringify(taskList));
});

$(".text-bg-danger").click(function () {
  let indexWarning = [];
  let indexOutOfStok = 0;
  taskList.filter((element, index) => {
    if (element.quantity > 2 && element.quantity < 20) {
      indexWarning.push(index);
    }
  });
  console.log(indexWarning);

  for (let i = 0; i < indexWarning.length; i++) {
    $(".data-row").eq(indexWarning[i]).children().css("background", "#ffc107");
  }
});

$(".text-bg-warning").click(function () {
  let indexWarning = [];
  let indexOutOfStok = 0;
  taskList.filter((element, index) => {
    if (element.quantity == 0) {
      indexWarning.push(index);
    }
  });
  console.log(indexWarning);

  for (let i = 0; i < indexWarning.length; i++) {
    $(".data-row").eq(indexWarning[i]).children().css("background", "#dc3545");
  }
});
