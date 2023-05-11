import { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import Alert from "./Alert";

function EmployeeInfo({ id, onClose }) {
  const [disabledInput, setDisabledInput] = useState(true);

  const [employee_id, setId] = useState("");
  const [employee_name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [prevPhoto, setPrevPhoto] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showSubmit, setShowSubmit] = useState('none');

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const [imagePreview, setImagePreview] = useState(null);

  // Retrieving the chosen employee from table
  useEffect(() => {
    Axios.get(`http://localhost:5000/api/employee_info/${id}`)
      .then((response) => {
        const employee = response.data[0];
        console.log(employee)
        setId(employee.employee_id);
        setName(employee.name);
        setDepartment(employee.department);
        setDesignation(employee.designation);
        
        const photoBlob = new Blob([employee.photo_blob], {type: "image/png"});
        const photoUrl = URL.createObjectURL(photoBlob);
        setPrevPhoto(photoUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const clearForm = () => {
    setName("");
    setId("");
    setDepartment("");
    setDesignation("")
  }

  // Handling photo upload change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setPhoto(e.target.files[0]);

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // handling CRUD operations events

  const handleCancelClick = () => {
    setDisabledInput(!disabledInput);
    onClose();
  };

  const handleEditClick = () => {
    clearForm();
    setDisabledInput(false);
    setShowSubmit('inline-block');
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    Axios.delete(`http://localhost:5000/api/delete_employee/${id}`)
      .then((response) => {
        setAlertText("Delete Successful");
        setShowAlert(true);
        clearForm();
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  };

  return (
    <div className="employee-info-page">
      <form className="edit-info-form">
        <div className="form-group">
          <div className="edit-form-input">
            <label htmlFor="employeeName">Employee Name</label>
            <input
              id="employeeName"
              name="employeeName"
              type="text"
              readOnly={disabledInput}
              disabled={disabledInput}
              value={employee_name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="edit-form-input">
            <label htmlFor="idNumber">ID Number</label>
            <input
              id="idNumber"
              name="idNumber"
              type="text"
              disabled={disabledInput}
              value={employee_id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="edit-form-input">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              name="department"
              type="text"
              disabled={disabledInput}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className="edit-form-input">
            <label htmlFor="designation">Designation</label>
            <input
              id="designation"
              name="designation"
              type="text"
              disabled={disabledInput}
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-form-input">
          <label htmlFor="profilePhoto">+ Upload</label>
          <div className="preview-wrapper">
            {imagePreview && (
              <img className="preview" src={imagePreview} alt="Preview" />
            )}
          </div>
          <input
            id="profilePhoto"
            name="profilePhoto"
            type="file"
            disabled={disabledInput}
            className="file-picker"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
              handleImageChange(e);
            }}
          />
        </div>
      </form>
      <div className="edit-delete-btns">
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleCancelClick}>Cancel</button>
        <button onClick={handleDeleteClick}>Delete</button>
        <button className="submit-btn" onClick={handleSubmit} style={{display: showSubmit}}>Submit</button>
      </div>
      {showAlert && (<Alert type="sucess" message={alertText}/>)}
    </div>
  );
}

export default EmployeeInfo;
