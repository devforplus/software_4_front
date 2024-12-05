import axios from "axios";
import { useEffect, useState } from "react";

const Register = () => {
  const [userid, setUserId] = useState("");
  const [userpwd, setUserPwd] = useState("");
  const [userpwdcheck, setUserPwdCheck] = useState("");
  const [username, setUserName] = useState("");
  const [userphone, setUserPhone] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const [idCheck, setIdCheck] = useState("");

  function pwdcheck() {
    if (userpwd.length === 0 || userpwdcheck.length === 0) {
      setPasswordCheck("");
    } else if (userpwd === userpwdcheck) {
      setPasswordCheck("비밀번호가 일치합니다.");
    } else setPasswordCheck("비밀번호가 일치하지 않습니다.");
  }

  const handleRegister = async () => {
    const userData = {
      id: userid,
      name: username,
      password: userpwd,
      phone: userphone,
    };
    if (passwordcheck === "비밀번호가 일치합니다.") {
      try {
        const response = await axios.post(
          "http://localhost:4000/signup",
          userData
        );
        if (response.data.ok === true) {
          alert("회원가입이 완료되었습니다!");
        } else {
          alert("회원가입에 실패했습니다.");
        }
        console.log(response.data.ok);
      } catch (error) {
        console.error("회원가입 중 오류 발생:", error);
        alert("회원가입에 실패했습니다.");
      }
      setUserId("");
      setUserName("");
      setUserPhone("");
      setUserPwd("");
      setUserPwdCheck("");
    } else {
      console.error("비밀번호가 일치하지 않습니다!");
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    pwdcheck();
  }, [userpwd, userpwdcheck]);

  return (
    <div className="max-w-[500px] w-full mx-auto my-5 box-border p-5 border border-gray-400 flex flex-col gap-8">
      <div className="relative h-16 flex items-center justify-center">
        <div className="text-3xl text-center pr-4">
          <a href="/" className="text-red-600 font-semibold">
            Schedule
          </a>
        </div>
        <div className="text-3xl text-center font-semibold">
          <h1>회원가입</h1>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mb-1" htmlFor="userid">
          아이디
        </label>
        <input
          id="userid"
          className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-100"
          type="text"
          value={userid}
          placeholder="아이디를 입력하세요."
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <div className="pt-3">
          <button
            className="bg-blue-400 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200"
            type="button"
            onClick={() => {
              axios
                .get(`http://localhost:4000/idcheck/${userid}`)
                .then((res) => {
                  if (res.data.ok === true) {
                    setIdCheck("사용가능한 아이디입니다.");
                  } else setIdCheck("중복된 아이디입니다.");
                });
            }}
          >
            아이디 확인
          </button>
          <p className="pt-3">{idCheck}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mb-1" htmlFor="userpwd">
          비밀번호
        </label>
        <input
          id="userpwd"
          value={userpwd}
          className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-100"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setUserPwd(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1" htmlFor="userpwd">
          비밀번호 확인
        </label>
        <input
          id="userpwd"
          value={userpwdcheck}
          className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-100"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setUserPwdCheck(e.target.value)}
        />
        <p>{passwordcheck}</p>
      </div>
      <div className="flex flex-col">
        <label className="mb-1" htmlFor="username">
          이름
        </label>
        <input
          id="username"
          value={username}
          className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-100"
          type="text"
          placeholder="이름을 입력하세요"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1" htmlFor="userphone">
          전화번호
        </label>
        <input
          id="userphone"
          value={userphone}
          className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-100"
          type="text"
          placeholder="전화번호를 입력하세요"
          onChange={(e) => setUserPhone(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center p-2">
        <button
          type="button"
          className="cursor-pointer w-40 border-none p-2 bg-blue-400 text-white rounded-md text-lg"
          onClick={handleRegister}
        >
          회원가입
        </button>
        <div className="ml-auto">
          <a href="/">계정이 있으신가요?</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
