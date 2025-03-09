"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

export default function CleaningRequestPostPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [password, setPassword] = useState("");
  // 1차, 2차 희망 날짜 및 시간 상태
  const [firstDateTime, setFirstDateTime] = useState("");
  const [secondDateTime, setSecondDateTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      installName: name,
      installPhone: phone,
      installEmail: email,
      installAddress: address,
      installDetailAddress: detailAddress,
      installDescription: requestMessage,
      installPassword: password,
      reservationFirstDate: firstDateTime,
      reservationSecondDate: secondDateTime,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/install`,
        payload,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      alert("에어컨 설치 신청이 완료되었습니다!");
      router.push("/estimate");
    } catch (error) {
      console.error("에어컨 설치 신청 오류:", error);
      alert("에어컨 설치 신청에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("신청을 취소하시겠습니까?")) {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold mb-6">에어컨 이전/설치 신청</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl border border-gray-300 rounded-md p-6"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* 이름 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="name">
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* 핸드폰 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="phone">
              핸드폰
            </label>
            <input
              id="phone"
              type="text"
              placeholder="핸드폰 번호를 입력하세요. 000-0000-0000"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* 이메일 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@example.com"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 주소 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium">주소</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="기본주소"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <button
                type="button"
                className="border border-gray-300 rounded px-3 py-2 bg-gray-100 hover:bg-gray-200"
              >
                주소 검색
              </button>
            </div>
            <input
              type="text"
              placeholder="상세주소"
              className="w-full mt-2 border border-gray-300 rounded px-3 py-2"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              required
            />
          </div>

          {/* 1차 희망 날짜 및 시간 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="firstDateTime">
              1차 희망 날짜 및 시간
            </label>
            <input
              id="firstDateTime"
              type="datetime-local"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={firstDateTime}
              onChange={(e) => setFirstDateTime(e.target.value)}
              required
            />
          </div>

          {/* 2차 희망 날짜 및 시간 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="secondDateTime">
              2차 희망 날짜 및 시간
            </label>
            <input
              id="secondDateTime"
              type="datetime-local"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={secondDateTime}
              onChange={(e) => setSecondDateTime(e.target.value)}
              required
            />
          </div>

          {/* 요청사항 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium">
              요청사항 (최대 1000자)
            </label>
            <textarea
              placeholder="설치 관련 요청사항을 입력하세요 (최대 1000자)"
              className="w-full border border-gray-300 rounded px-3 py-2 h-40 overflow-y-auto"
              maxLength={1000}
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
            />
          </div>

          {/* 비밀번호 */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium" htmlFor="password">
              비밀번호 (4자리 숫자)
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={4}
              minLength={4}
              pattern="\d{4}"
              required
            />
          </div>
        </div>

        {/* 작성하기 / 취소 버튼 */}
        <div className="mt-6 flex space-x-4 justify-center">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            작성하기
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
