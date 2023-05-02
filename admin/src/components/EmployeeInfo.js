import { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";

function EmployeeInfo({ id }) {
  const [retrievedInfo, setRetrievedInfo] = useState(null);
  const [queryType, setQueryType] = useState("");
  const [disabledInput, setDisabledInput] = useState(true);

  const [employee_id, setId] = useState("");
  const [employee_name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [prevPhoto, setPrevPhoto] = useState("");
  const [photo, setPhoto] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  // Retrieving the chosen employee from table
  useEffect(() => {
    Axios.get(`http://localhost:5000/api/employee_info/${id}`)
      .then((response) => {
        const employee = response.data[0];
        setRetrievedInfo(response);
        setId(employee.employee_id);
        setName(employee.name);
        setDepartment(employee.department);
        setDesignation(employee.designation);
        setPrevPhoto(employee.image);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleCancelClick = () => {
    setDisabledInput(true);
  };

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

  // handling the edit button click event
  const handleEditClick = () => {
    setDisabledInput(false);
    setQueryType("edit");
  };

  // handling the delete button event
  const handleDeleteClick = () => {
    Axios.delete(`http://localhost:5000/api/delete_employee/${id}`)
      .then((response) => {
        console.log(response);
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
              disabled={disabledInput}
              value={employee_name}
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
      </div>
    </div>
  );
}

export default EmployeeInfo;
