import React, { useState } from "react";
import MainForm from "./components/MainForm";
import JobQuestions from "./components/JobQuestions";
import SuccessPage from "./components/end";

export default function App() {
  // حالة الخطوات (1 = بيانات أساسية، 2 = أسئلة الوظيفة)
  const [step, setStep] = useState(1);

  // بيانات المستخدم الأساسية
  const [mainData, setMainData] = useState(null);

  // الانتقال من الخطوة الأولى للثانية
  const handleNext = (data) => {
    console.log("📋 البيانات المستلمة من النموذج:", data);
    setMainData(data);
    setStep(2);
  };

  // الرجوع للخطوة الأولى
  const handleBack = () => {
    setStep(1);
  };

  // إرسال الطلب النهائي
  const handleSubmit = (finalData) => {
    console.log("🚀 البيانات النهائية للإرسال:", finalData);
    
    // هنا يمكنك إرسال البيانات إلى الباك إند
    // مثال:
    // fetch("/api/apply", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(finalData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //   alert("✅ تم تقديم الطلب بنجاح!");
    //   // إعادة تعيين النموذج
    //   setStep(1);
    //   setMainData(null);
    // })
    // .catch(error => {
    //   console.error("❌ خطأ في الإرسال:", error);
    //   alert("حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى.");
    // });

    // للاختبار فقط:
    alert("✅ تم تقديم الطلب بنجاح!");
    
    // إعادة تعيين النموذج بعد الإرسال
   setStep(3); // خطوة جديدة للنجاح
  setMainData(finalData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الخطوة الأولى: النموذج الأساسي */}
      {step === 1 && (
        <MainForm onNext={handleNext} />
      )}

      {/* الخطوة الثانية: أسئلة الوظيفة */}
      {step === 2 && mainData && (
        <JobQuestions
          job={mainData.job}
          mainData={mainData}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      )}

      {step === 3 && (
  <SuccessPage
    applicationData={mainData}
    onBackToHome={() => {
      setStep(1);
      setMainData(null);
    }}
  />
)}
    </div>
  );
}