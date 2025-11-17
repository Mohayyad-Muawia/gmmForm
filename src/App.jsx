import React, { useState } from "react";
import MainForm from "./components/MainForm";
import JobQuestions from "./components/JobQuestions";
import SuccessPage from "./components/end";

// 👇 استيراد supabase
import { createClient } from "@supabase/supabase-js";

// 👇 إنشاء عميل Supabase
const supabase = createClient(
 "https://pdyzylmlacucxfjmzjsa.supabase.co",
  "sb_publishable_4ZZYh7TrJjUQXkMfGJoAcw_o4s8gyqc"
);

export default function App() {
  const [step, setStep] = useState(1);
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

  // ⬅️ دالة إرسال البيانات حسب الـ department
  const sendToSupabase = async (department, data) => {
    console.log("📤 إرسال البيانات لجدول:", department);
    const { error } = await supabase.from(department).insert([data]);

    if (error) {
      console.error("❌ خطأ أثناء الإرسال:", error);
      alert("⚠️ حدث خطأ أثناء إرسال الطلب!");
      return false;
    }

    return true;
  };

  // إرسال الطلب النهائي
  const handleSubmit = async (finalData) => {
    console.log("🚀 البيانات النهائية للإرسال:", finalData);

    const department = mainData.department; // 👈 جدول الإرسال المختار من المستخدم

    if (!department) {
      alert("⚠️ لا يوجد قسم محدد!");
      return;
    }

    // دمج بيانات الخطوتين
    const fullData = {
      ...mainData,
      ...finalData,
      created_at: new Date(),
    };

    const success = await sendToSupabase(department, fullData);

    if (!success) return;

    alert("✅ تم تقديم الطلب بنجاح!");
    
    setMainData(fullData);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {step === 1 && (
        <MainForm onNext={handleNext} />
      )}

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
