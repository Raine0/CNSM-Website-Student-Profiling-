import React, { useState, useEffect } from 'react';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    year_level: '',
    student_id: '',
    department: '',
    classification: '',
    course: '',
    house_no: '',
    street: '',
    barangay: '',
    city: '',
    province: '',
    zip_code: '',
    contact: '',
    blood_type: '',
    email: '',
    image: '',
    birthdate: '',
    emergency_contact: '',
    last_school_attended: '',
  });

  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    // Fetch department data from your backend API
    fetch('/api/department')
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
      });

    // Fetch course data from your backend API
    fetch('/api/course')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      // Handle file input separately
      setFormData({
        ...formData,
        [name]: files[0], // Assuming you allow only one image to be selected
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API to create a student
      const response = await fetch('/api/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Handle successful student creation
        console.log('Student created successfully');
        window.location.reload();
      } else {
        // Handle errors, e.g., validation errors or server issues
        console.error('Error creating student');
      }
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  // Function to render the "Course" dropdown based on the selected department
  function renderCourseDropdown(selectedDepartment) {
    // Define a mapping of departments to their corresponding courses
    const departmentToCourses = {
      'IT Department': [
        { code: 'BSIT', name: 'BS in Information Technology' },
      ],
      'Biology Department': [
        { code: 'BSBIO', name: 'BS in Biology' },
      ],
      'Mathematics Department': [
        { code: 'BSMATH', name: 'BS in Mathematics' },
      ],
    };
    
    // Find the corresponding department's courses
    const selectedDepartmentCourses = departmentToCourses[selectedDepartment];

    if (selectedDepartmentCourses && selectedDepartmentCourses.length > 0) {
      return (
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Course</option>
          {selectedDepartmentCourses.map((course) => (
            <option key={course.code} value={course.code}>
              {course.name}
            </option>
          ))}
        </select>
      );
    }

    return null;
  }

  return (
    <div className="student-form">
      <h2>STUDENT REGISTRATION FORM</h2>
      <form onSubmit={handleSubmit}   encType="multipart/form-data">
        <label><h2>Full Name</h2></label>
        <hr></hr>
        <div className='name-container'>   
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="input-field"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="input-field"
        />
        <input
          type="text"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
          placeholder="Middle Name"
          className="input-field"
        />
        <input
          type="text"
          name="Suffix"
          value={formData.suffix}
          onChange={handleChange}
          placeholder="Suffix"
          className="input-field"
        />
        </div>

        <label><h2>Address</h2></label>
        <hr></hr>
        <div className='address-container'>
              
          <input
            type="text"
            name="house_number"
            value={formData.address}
            onChange={handleChange}
            placeholder="House No."
            className="input-field"
          />
           <input
            type="text"
            name="street"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street"
            className="input-field"
          />
           <input
            type="text"
            name="caranggay"
            value={formData.address}
            onChange={handleChange}
            placeholder="Baranggay"
            className="input-field"
          />
           <input
            type="text"
            name="city"
            value={formData.address}
            onChange={handleChange}
            placeholder="City"
            className="input-field"
          />
           <input
            type="text"
            name="province"
            value={formData.address}
            onChange={handleChange}
            placeholder="Province"
            className="input-field"
          />

          <input
            type="text"
            name="zip"
            value={formData.address}
            onChange={handleChange}
            placeholder="Zip Code"
            className="input-field"
          />
        </div>

        <label><h2>Student Information</h2></label>
        <hr></hr>
        <div className='studentinfo-container'>
        <select
          name="year_level"
          value={formData.year_level}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Year Level</option>
          <option value="1st year">1st year</option>
          <option value="2nd year">2nd year</option>
          <option value="3rd year">3rd year</option>
          <option value="4th year">4th year</option>
        </select>

        <input
          type="text"
          name="student-id"
          value={formData.year_enrolled}
          onChange={handleChange}
          placeholder="Student ID Number"
          className="input-field"
        />
        </div>
       
        
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department._id} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>
        
        
        {formData.department && renderCourseDropdown(formData.department, formData.course)}
        
        <div>
        <input
          type="text"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          placeholder="Birthdate (MM/DD/YYYY)"
          className="input-field"
        />

        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          className="input-field"
        />
      
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input-field"
        />

        <input
          type="text"
          name="emergency_contact"
          value={formData.emergency_contact}
          onChange={handleChange}
          placeholder="Emergency Contact Number"
          className="input-field"
        />

        <input
          type="text"
          name="last_school_attended"
          value={formData.last_school_attended}
          onChange={handleChange}
          placeholder="Last School Attended"
          className="input-field"
        />
        </div>

        <div className='profile-picture'>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*" // Allow only image files
        />  
        <button type="submit" className="submit-button">
          Create Student
        </button>
        </div>
      </form>
    </div>
  );
};





export default StudentForm;
