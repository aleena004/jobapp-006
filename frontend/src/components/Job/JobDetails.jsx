import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <div className="job-info">
            <div className="info-item">
              <h4>Title:</h4>
              <p>{job.title}</p>
            </div>
            <div className="info-item">
              <h4>Category:</h4>
              <p>{job.category}</p>
            </div>
            <div className="info-item">
              <h4>Country:</h4>
              <p>{job.country}</p>
            </div>
            <div className="info-item">
              <h4>City:</h4>
              <p>{job.city}</p>
            </div>
            <div className="info-item">
              <h4>Location:</h4>
              <p>{job.location}</p>
            </div>
            <div className="info-item">
              <h4>Description:</h4>
              <p>{job.description}</p>
            </div>
            <div className="info-item">
              <h4>Job Posted On:</h4>
              <p>{job.jobPostedOn}</p>
            </div>
            <div className="info-item">
              <h4>Salary:</h4>
              {job.fixedSalary ? (
                <p>{job.fixedSalary}</p>
              ) : (
                <p>
                  {job.salaryFrom} - {job.salaryTo}
                </p>
              )}
            </div>
          </div>

          {user && user.role !== "Employer" && (
            <Link to={`/application/${job._id}`} className="apply-btn">
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
