import { useEffect, useState } from "react";
import "../App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";

interface MyCalendarEvent {
  id: string;
  // 이름 변경
  title: string;
  date: string;
}

function Main() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<MyCalendarEvent[]>([]); // 이름 변경
  const [eventTitle, setEventTitle] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<MyCalendarEvent | null>(
    null
  ); // 이름 변경

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.date);
    setSelectedEvent(null);
    setEventTitle("");
  };

  const handleEventClick = (arg: any) => {
    const clickedEventDate = arg.event.start;
    const clickedEventDateString = new Date(
      clickedEventDate.getTime() - clickedEventDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    const clickedEvent = events.find(
      (event) => event.date === clickedEventDateString
    );

    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setEventTitle(clickedEvent.title);
      setSelectedDate(new Date(clickedEvent.date));
    } else {
      console.error("Clicked event not found");
    }
  };

  const handleAddEvent = async () => {
    if (eventTitle && selectedDate) {
      const eventDate = new Date(selectedDate);
      eventDate.setUTCHours(24, 0, 0, 0);

      const newEvent: MyCalendarEvent = {
        // 이름 변경
        id: Date.now().toString(),
        title: eventTitle,
        date: eventDate.toISOString().split("T")[0],
      };
      try {
        const response = await axios.post(
          "http://localhost:4000/registerDate",
          {
            id: newEvent.id,
            title: newEvent.title,
            date: newEvent.date,
          }
        );
        alert("일정 등록에 성공하였습니다!");
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setEventTitle("");
        setSelectedDate(null);
        console.log(newEvent);
      } catch (error) {
        console.error("일정 등록 중 오류 발생: ", error);
        alert("일정 등록에 실패했습니다.");
      }
    }
  };

  const handleUpdateEvent = async () => {
    if (selectedEvent && eventTitle && selectedDate) {
      const updatedEvent = {
        ...selectedEvent,
        title: eventTitle,
        date: selectedDate.toISOString().split("T")[0],
      };
      try {
        const response = await axios.put(
          `http://localhost:4000/updateDate/${selectedEvent.id}`,
          updatedEvent
        );
        if (response.data.ok) {
          const updatedEvents = events.map((event) =>
            event.id === selectedEvent.id ? updatedEvent : event
          );
          setEvents(updatedEvents);
          setSelectedEvent(updatedEvent);
          setEventTitle(eventTitle);
          alert("일정이 수정되었습니다.");
        }
      } catch (error) {
        console.error("일정 수정 중 오류 발생: ", error);
        alert("일정 수정에 실패했습니다.");
      }
    }
  };

  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/deleteDate/${selectedEvent.id}` // URL에 날짜 포함
        );

        if (response.data.ok) {
          const updatedEvents = events.filter(
            (event) => event.id !== selectedEvent.id
          );
          setEvents(updatedEvents);
          setSelectedEvent(null);
          setEventTitle("");
          setSelectedDate(null);
          alert("일정이 삭제되었습니다.");
        }
      } catch (error) {
        console.error("일정 삭제 중 오류 발생: ", error);
        alert("일정 삭제에 실패했습니다.");
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-screen pt-4">
      <div className="flex w-4/5">
        <div className="w-2/3">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            dateClick={handleDateClick}
            events={events}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth, timeGridWeek, timeGridDay, today",
            }}
            buttonText={{
              today: "오늘",
              month: "월별",
              week: "주별",
              day: "일별",
              list: "리스트",
            }}
            eventClick={handleEventClick}
          />
        </div>
        <div className="w-1/3 pl-4">
          {!selectedEvent && selectedDate && (
            <div className="pt-24 pl-4">
              <h2 className="pb-4 text-lg font-semibold">
                선택한 날짜: {selectedDate.toLocaleDateString()}
              </h2>
              <input
                className="border border-gray-300 rounded p-2 w-full mb-4"
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="일정 제목 입력"
              />
              <button
                type="button"
                onClick={handleAddEvent}
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200"
              >
                일정 추가
              </button>
            </div>
          )}
          {selectedEvent && (
            <div className="pt-24 pl-4">
              <h1 className="text-2xl pb-4">일정 수정</h1>
              <h2 className="text-xl pb-2">일정 제목</h2>
              <input
                className="border border-gray-300 rounded p-2 w-full mb-2"
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="일정 제목 입력"
              />
              <h3>날짜 변경:</h3>
              <input
                type="date"
                value={selectedEvent.date}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="border border-gray-300 rounded p-2 w-full mb-4"
              />
              <div className="flex">
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleUpdateEvent}
                    className="bg-blue-500 text-white rounded p-2 mr-2"
                  >
                    일정 수정
                  </button>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleDeleteEvent}
                    className="bg-red-500 text-white rounded p-2"
                  >
                    일정 삭제
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
