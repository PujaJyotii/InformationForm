import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./InfoForm.module.css";
import ErrorModal from "../Modal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { ListSliceAction } from "../Redux/ListSlice";

function InfoForm() {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [college, setCollege] = useState("");
  const [error, setError] = useState(null);
  const list = useSelector((state) => state.list.arr);
  const dispatch = useDispatch();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (name.length === 0 || branch.length === 0 || college.length === 0) {
      setError({
        title: "Invalid Input",
        message: "Check your input carefully there is some error",
      });
      return;
    }
    let obj = {
      name: name,
      branch: branch,
      college: college,
    };
    try {
      let response = await fetch(
        "https://movie-project-28d8c-default-rtdb.firebaseio.com/info.json",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something Went wrong!");
      }
      let data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    dispatch(ListSliceAction.add(obj));
    setName("");
    setBranch("");
    setCollege("");
  };

  const closeHandler = () => {
    setError(null);
  };
  useEffect(() => {
    async function gettingData() {
      let response = await fetch(
        "https://movie-project-28d8c-default-rtdb.firebaseio.com/info.json"
      );
      let data = await response.json();
      let newArr = [];
      for (let key in data) {
        newArr.push({
          id: key,
          ...data[key],
        });
      }
      dispatch(ListSliceAction.set(newArr));
    }
    gettingData();
  }, [dispatch]);
  const DeleteHandler = async (info) => {
    let index = list.findIndex((item) => item.name === info.name);
    try {
      let response = await fetch(
        `https://movie-project-28d8c-default-rtdb.firebaseio.com/info/${list[index].id}.json`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something is Wrong!");
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(ListSliceAction.delete(info));
  };
  const EditHandler = async (info) => {
    setName(info.name);
    setBranch(info.branch);
    setCollege(info.college);
    let index = list.findIndex((item) => item.name === info.name);
    try {
      let response = await fetch(
        `https://movie-project-28d8c-default-rtdb.firebaseio.com/info/${list[index].id}.json`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something is Wrong!");
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(ListSliceAction.delete(info));
  };
  const UpdateHandler = async (id) => {
    let index = list.findIndex((item) => item.name === id);
    if (name.length === 0 || branch.length === 0 || college.length === 0) {
      return;
    }

    let updatedInfo = {
      name: name,
      branch: branch,
      college: college,
    };
    try {
      let response = await fetch(
        `https://movie-project-28d8c-default-rtdb.firebaseio.com/info/${list[index].id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedInfo),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Error while updating");
      }
      let data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    dispatch(ListSliceAction.update({ updatedInfo, id: id }));
  };
  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClose={closeHandler}
        />
      )}
      <Card className={classes.box}>
        <form onSubmit={SubmitHandler}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Branch:</label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
          <label>College:</label>
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </Card>
      <Card className={classes.list}>
        <ul>
          {list.map((info) => (
            <li key={info.name}>
              <div className={classes.outer}>
                <div>Name:{info.name}</div>
                <div>Branch:{info.branch}</div>
                <div>College:{info.college}</div>
                <div className={classes.inner}>
                  <button onClick={() => UpdateHandler(info.name)}>
                    Update
                  </button>
                  <button onClick={() => EditHandler(info)}>Edit</button>
                  <button onClick={() => DeleteHandler(info)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
export default InfoForm;
