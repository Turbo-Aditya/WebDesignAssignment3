// Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
}

var socialMedia = {
  facebook: 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

var fullName = "Aditya Verma";
var NUID = "002309034";

window.onload = function () {
  let personalInfo = document.createElement('div');
  personalInfo.innerHTML = `<h2>${fullName} - ${NUID} </h2>`;
  personalInfo.style.textAlign = 'center';
  document.body.insertBefore(personalInfo, document.body.firstChild);
}

document.getElementById("button").disabled = true;
document.getElementById("button").style.backgroundColor = "gray";

document.addEventListener('DOMContentLoaded', function () {
  const dropDownRows = document.querySelectorAll('.dropDownTextArea');
  dropDownRows.forEach(row => {
    row.style.display = 'none';
  });

  const updatedTable = document.getElementById('myTable');
  let studentCount = 3;

  document.getElementById('add').addEventListener('click', function () {
    try {
      studentCount++;
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
              <td><input type="checkbox" /><br /><br /><img src="down.png" width="25px" /></td>
              <td>Student ${studentCount}</td>
              <td>Teacher ${studentCount}</td>
              <td>Approved</td>
              <td>Fall</td>
              <td>TA</td>
              <td>${12345 + studentCount}</td>
              <td>100%</td>
           `;

      const newDropDownRow = document.createElement('tr');
      newDropDownRow.className = 'dropDownTextArea';
      newDropDownRow.style.display = 'none';
      newDropDownRow.innerHTML = `
              <td colspan="8">
                  Advisor:<br /><br />
                  Award Details<br />
                  Summer 1-2014(TA)<br />
                  Budget Number: <br />
                  Tuition Number: <br />
                  Comments:<br /><br /><br />
                  Award Status:<br /><br /><br />
              </td>
          `;

      console.log('New student added!');
      updatedTable.appendChild(newRow);
      updatedTable.appendChild(newDropDownRow);

      alert(`Student ${studentCount} Record added successfully`);
    } catch (err) {
      console.log(err);
      alert(`An error has occurred ${err}`);
    }
  });

  updatedTable.addEventListener('click', function (event) {
    if (event.target.tagName === 'IMG' && event.target.src.endsWith('down.png')) {
      let dropDownText = event.target.closest('tr').nextElementSibling;
      if (dropDownText && dropDownText.classList.contains('dropDownTextArea')) {
        dropDownText.style.display = dropDownText.style.display === 'table-row' ? 'none' : 'table-row';
      }
    }

    
    if (event.target.type === 'checkbox') {
      let row = event.target.closest('tr');
      const tableHeader = document.querySelector("#myTable tr:first-child");
      if (event.target.checked) {

        row.style.backgroundColor = 'yellow';

      
        document.getElementById('button').disabled = false;
        document.getElementById('button').style.backgroundColor = 'orange';

      
        if (!row.querySelector('.edit-button')) {

          const delHeader = document.createElement("th");
          delHeader.innerHTML = "Delete";
          delHeader.classList.add("delHeader")

          tableHeader.appendChild(delHeader)

          const deleteCell = document.createElement('td');
          deleteCell.innerHTML = `<button class="delete-button" type="button">Delete</button>`;
          row.appendChild(deleteCell);

          const newHeader = document.createElement("th");
          newHeader.textContent = "Edit";
          newHeader.classList.add("newHeading");

          tableHeader.appendChild(newHeader);

          const editCell = document.createElement('td');
          editCell.innerHTML = `<button class="edit-button" type="button">Edit</button>`;
          row.appendChild(editCell);



          // Event listeners 
          editCell.querySelector('.edit-button').addEventListener('click', function () {
            const studentName = row.cells[1].textContent;
            showEditPopup(studentName, row);
          });

          deleteCell.querySelector('.delete-button').addEventListener('click', function () {
            const studentName = row.cells[1].textContent;
            row.remove();
            const editHeader = tableHeader.querySelector(".newHeading");
            if (editHeader) {
              editHeader.remove();
            }

            const dellHeader = tableHeader.querySelector(".delHeader");
            if (dellHeader) {
              dellHeader.remove();
            }
            alert(`${studentName} Record deleted successfully`);
          });
        }
      } else {

        row.style.backgroundColor = '';

        const editHeader = tableHeader.querySelector(".newHeading");
        if (editHeader) {
          editHeader.remove();
        }

        const dellHeader = tableHeader.querySelector(".delHeader");
        if (dellHeader) {
          dellHeader.remove();
        }

        row.querySelector('.edit-button').parentElement.remove();
        row.querySelector('.delete-button').parentElement.remove();

        document.getElementById("button").disabled = true;
        document.getElementById("button").style.backgroundColor = "gray";

      }
    }
  });

  function showEditPopup(studentName, row) {
    
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.border = '1px solid black';

    popup.innerHTML = `
      <h3>Edit details of ${studentName}</h3>
      <p>Student Name: ${row.cells[1].textContent}</p>
      <p>Teacher Name: ${row.cells[2].textContent}</p>
      <p>Status: ${row.cells[3].textContent}</p>
      <button id="updateButton">Update</button>
      <button id="cancelButton">Cancel</button>
    `;

    document.body.appendChild(popup);

    document.getElementById('updateButton').addEventListener('click', function () {
      alert(`${studentName} data updated successfully`);
      document.body.removeChild(popup);
    });

    document.getElementById('cancelButton').addEventListener('click', function () {
      document.body.removeChild(popup);
    });
  }
});
