import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 추가

const Login = () => {
  const [userid, setUserId] = useState("");
  const [userpwd, setUserPwd] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handlelogin = async () => {
    const userData = {
      ID: userid,
      password: userpwd,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        userData
      );
      if (response.data.ok === true) {
        alert("로그인이 완료되었습니다!");
        localStorage.setItem("userid", response.data.user.ID);
        navigate("/Main"); // 로그인 성공 시 메인 페이지로 이동
      } else {
        alert("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-[500px] w-full mx-auto my-5 box-border p-5 border border-gray-400 flex flex-col gap-8">
      <div className="relative h-16 flex items-center justify-center">
        <div className="text-3xl text-center pr-4">
          <a href="/" className="text-red-600 font-semibold">
            Schedule
          </a>
        </div>
        <div className="text-3xl text-center font-semibold">
          <h1>로그인</h1>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mb-1" htmlFor="userid">
          ID
        </label>
        <input
          id="userid"
          className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-100"
          type="text"
          placeholder="아이디를 입력하세요."
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1" htmlFor="userpwd">
          PassWord
        </label>
        <input
          id="userpwd"
          className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-100"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setUserPwd(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center p-2">
        <button
          type="button"
          className="cursor-pointer w-20 border-none p-2 bg-blue-400 text-white rounded-md text-lg"
          onClick={handlelogin}
        >
          로그인
        </button>
        <div className="ml-auto">
          <a href="/Register">계정이 없으신가요?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
