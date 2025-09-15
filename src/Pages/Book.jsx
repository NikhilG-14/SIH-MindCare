import { useState } from "react";

function Book() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Sample data - in a real app, this would come from an API
  const specialties = [
    { id: 1, name: "Anxiety & Stress", icon: "🧠" },
    { id: 2, name: "Depression", icon: "🌧️" },
    { id: 3, name: "Relationship Issues", icon: "💑" },
    { id: 4, name: "Trauma & PTSD", icon: "🛡️" },
    { id: 5, name: "Addiction", icon: "🚫" },
    { id: 6, name: "Child & Adolescent", icon: "👦" },
  ];

  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Anxiety & Stress",
      experience: "12 years",
      rating: 4.9,
      reviews: 127,
      image: "👩‍⚕️",
      bio: "Specialized in CBT and mindfulness approaches for anxiety management.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Depression",
      experience: "8 years",
      rating: 4.8,
      reviews: 94,
      image: "👨‍⚕️",
      bio: "Focuses on integrative therapy combining talk therapy and behavioral activation.",
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      specialty: "Relationship Issues",
      experience: "15 years",
      rating: 4.9,
      reviews: 156,
      image: "👩‍⚕️",
      bio: "Couples therapy expert with Gottman Method certification.",
    },
  ];

  const availableDates = [
    "2025-01-15",
    "2025-01-16",
    "2025-01-17",
    "2025-01-18",
    "2025-01-19",
  ];

  const availableTimes = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
    setActiveStep(2);
  };

  const handleTherapistSelect = (therapist) => {
    setSelectedTherapist(therapist);
    setActiveStep(3);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setActiveStep(4);
  };

  const handleBookingConfirm = () => {
    setBookingConfirmed(true);
    // In a real app, you would send the booking data to your backend here
  };

  const handleNewBooking = () => {
    setActiveStep(1);
    setSelectedSpecialty("");
    setSelectedTherapist(null);
    setSelectedDate("");
    setSelectedTime("");
    setBookingConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Book a Therapy Session
          </h1>
          <p className="text-lg text-blue-600 max-w-2xl mx-auto">
            Take the first step towards better mental health. Book a session
            with one of our licensed professionals.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-200 transform -translate-y-1/2 -z-10"></div>
            <div
              className="absolute top-1/2 left-0 h-1 bg-blue-600 transform -translate-y-1/2 -z-10 transition-all duration-500"
              style={{ width: `${(activeStep / 4) * 100}%` }}
            ></div>

            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    activeStep >= step
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-blue-300 text-blue-400"
                  } transition-all duration-300`}
                >
                  {step}
                </div>
                <span className="mt-2 text-sm font-medium text-blue-800">
                  {step === 1 && "Specialty"}
                  {step === 2 && "Therapist"}
                  {step === 3 && "Time"}
                  {step === 4 && "Confirm"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 animate-fade-in-up">
          {bookingConfirmed ? (
            <div className="text-center py-10">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-lg text-blue-600 mb-6">
                Your session with {selectedTherapist.name} on {selectedDate} at{" "}
                {selectedTime} has been confirmed.
              </p>
              <p className="text-blue-500 mb-8">
                A confirmation email with meeting details has been sent to your
                inbox.
              </p>
              <button
                onClick={handleNewBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
              >
                Book Another Session
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Specialty Selection */}
              {activeStep === 1 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                    What would you like to focus on?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {specialties.map((specialty) => (
                      <div
                        key={specialty.id}
                        onClick={() => handleSpecialtySelect(specialty.name)}
                        className="border-2 border-blue-200 rounded-xl p-5 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-md hover:scale-105"
                      >
                        <div className="text-4xl mb-3">{specialty.icon}</div>
                        <h3 className="font-medium text-blue-800">
                          {specialty.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Therapist Selection */}
              {activeStep === 2 && (
                <div className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="mr-4 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <h2 className="text-2xl font-semibold text-blue-800">
                      Select a Therapist specializing in {selectedSpecialty}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {therapists
                      .filter((t) => t.specialty === selectedSpecialty)
                      .map((therapist) => (
                        <div
                          key={therapist.id}
                          onClick={() => handleTherapistSelect(therapist)}
                          className="border-2 border-blue-200 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-lg"
                        >
                          <div className="flex items-start">
                            <div className="text-5xl mr-5">
                              {therapist.image}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-blue-800">
                                {therapist.name}
                              </h3>
                              <div className="flex items-center mt-2">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span className="text-blue-700 font-medium">
                                  {therapist.rating}
                                </span>
                                <span className="text-blue-500 ml-2">
                                  ({therapist.reviews} reviews)
                                </span>
                              </div>
                              <p className="text-blue-600 mt-2">
                                {therapist.experience} experience
                              </p>
                              <p className="text-blue-500 mt-3">
                                {therapist.bio}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Step 3: Date & Time Selection */}
              {activeStep === 3 && (
                <div className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="mr-4 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <h2 className="text-2xl font-semibold text-blue-800">
                      Select Date & Time with {selectedTherapist.name}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-blue-800 mb-4">
                        Select Date
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {availableDates.map((date) => (
                          <div
                            key={date}
                            onClick={() => handleDateSelect(date)}
                            className={`border-2 rounded-lg p-3 text-center cursor-pointer transition-all duration-300 ${
                              selectedDate === date
                                ? "border-blue-600 bg-blue-50"
                                : "border-blue-200 hover:border-blue-400"
                            }`}
                          >
                            <div className="font-semibold text-blue-800">
                              {new Date(date).toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </div>
                            <div className="text-blue-600">
                              {new Date(date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-blue-800 mb-4">
                        Select Time
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {availableTimes.map((time) => (
                          <div
                            key={time}
                            onClick={() =>
                              selectedDate && handleTimeSelect(time)
                            }
                            className={`border-2 rounded-lg p-3 text-center cursor-pointer transition-all duration-300 ${
                              !selectedDate
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            } ${
                              selectedTime === time
                                ? "border-blue-600 bg-blue-50"
                                : "border-blue-200 hover:border-blue-400"
                            }`}
                          >
                            {time}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Booking Confirmation */}
              {activeStep === 4 && (
                <div className="animate-fade-in">
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setActiveStep(3)}
                      className="mr-4 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <h2 className="text-2xl font-semibold text-blue-800">
                      Confirm Your Booking
                    </h2>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">
                      Session Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">
                          Therapist
                        </h4>
                        <div className="flex items-center">
                          <div className="text-3xl mr-3">
                            {selectedTherapist.image}
                          </div>
                          <div>
                            <p className="font-semibold text-blue-800">
                              {selectedTherapist.name}
                            </p>
                            <p className="text-blue-600">
                              {selectedTherapist.specialty}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">
                          Date & Time
                        </h4>
                        <p className="font-semibold text-blue-800">
                          {new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-blue-600">{selectedTime}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-blue-200">
                      <h4 className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">
                        Session Type
                      </h4>
                      <div className="flex justify-between items-center">
                        <p className="text-blue-800">
                          Video Consultation (50 mins)
                        </p>
                        <p className="font-semibold text-blue-800">$85.00</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleBookingConfirm}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Support Message */}
        <div className="text-center text-blue-600 animate-fade-in">
          <p>
            Need assistance? Contact our support team at
            support@mindcare.example.com
          </p>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale {
          from {
            transform: scale(0.8);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        .animate-scale {
          animation: scale 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Book;
