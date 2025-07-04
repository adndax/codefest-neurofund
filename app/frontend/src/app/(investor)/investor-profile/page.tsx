"use client"

import { useState, useEffect } from "react";
import { Header, Paragraph } from "@/components/Typography";
import Card from "./card";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { researchList } from "@data";

export default function InvestorProfile() {
  const { isLoggedIn, user, fundedResearch = [] } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("ongoing");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (user?.role !== "Investor") {
      router.push(user?.role === "Researcher" ? "/researcher-profile" : "/");
    }
  }, [isLoggedIn, user, router]);

  // Debug log to check fundedResearch
  useEffect(() => {
    console.log("Current fundedResearch:", fundedResearch);
    console.log("FundedResearch length:", fundedResearch.length);
  }, [fundedResearch]);

  if (!isLoggedIn || user?.role !== "Investor") {
    return <div>Loading...</div>;
  }

  const handleClose = () => {
    router.push("/investor");
  };

  // Get ongoing research from researchList
  const ongoingResearchList = researchList.slice(0, 4).map(research => ({
    id: research.id,
    title: research.title,
    description: research.description,
    author: research.author,
    date: research.date,
    likes: research.likes,
  }));

  // Determine which research list to show based on active tab
  const researchListToShow = activeTab === "ongoing" ? ongoingResearchList : fundedResearch;

  return (
    <div className="min-h-screen text-white">
      <button
        onClick={handleClose}
        className="fixed top-6 right-6 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 group cursor-pointer"
        aria-label="Close and return to investor page"
      >
        <svg
          className="w-6 h-6 text-white group-hover:text-gray-200 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="relative">
        <div className="w-full h-40 bg-[#A7C4EC]"></div>
        <div className="absolute left-55 -bottom-8">
          <div className="w-24 h-24 rounded-full bg-[#E6C798] border-4 border-white flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-10 pt-12 pb-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col items-start">
            <Header className="text-3xl font-bold mb-1">
              {user?.name || "Adindashahira Asyraf"}
            </Header>
            <Paragraph className="text-[#A7C4EC] text-lg">{user?.role}</Paragraph>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="text-gray-400">Bandung, Institute of Technology</span>
          </div>
        </div>

        <Paragraph className="text-gray-300 mb-8 text-justify leading-relaxed">
          A biotechnology researcher with over 8 years of experience in developing early disease detection methods using biomarker-based approaches. Actively publishing in international journals and passionate about multidisciplinary collaborations that bring real-world impact to society.
        </Paragraph>

        <div className="flex space-x-8 mb-6">
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`pb-2 text-lg font-medium border-b-2 transition ${
              activeTab === "ongoing"
                ? "text-[#A7C4EC] border-[#A7C4EC]"
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            Ongoing Research
          </button>
          <button
            onClick={() => setActiveTab("funded")}
            className={`pb-2 text-lg font-medium border-b-2 transition ${
              activeTab === "funded"
                ? "text-[#A7C4EC] border-[#A7C4EC]"
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            Funded Research ({fundedResearch.length})
          </button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">All Research:</span>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search research..."
                className="bg-white text-black rounded-md w-80 h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#A7C4EC]"
              />
              <button className="ml-2 p-2 text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-6 py-2 bg-[#225491] text-white rounded-lg hover:bg-[#1e4a7f] transition font-medium">
              <span>Sort by</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
              </svg>
            </button>
            <button className="px-6 py-2 bg-[#225491] text-white rounded-lg hover:bg-[#1e4a7f] transition font-medium">
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchListToShow.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-lg">
                {activeTab === "funded"
                  ? "No funded research yet. Start funding research to see them here!"
                  : "No ongoing research available."}
              </div>
              {activeTab === "funded" && (
                <div className="mt-4 text-sm text-gray-500">
                  <p>When you fund research from the research page, it will appear here.</p>
                </div>
              )}
            </div>
          ) : (
            researchListToShow.map((research, index) => (
              <Card
                key={research.id || `research-${index}`}
                title={research.title}
                description={research.description}
                author={research.author}
                date={
                  activeTab === "funded" && "fundingDate" in research
                    ? `Funded on ${research.fundingDate}`
                    : research.date
                }
                likes={research.likes}
              />
            ))
          )}
        </div>

        {/* Funding Summary - Only show when there's funded research */}
        {activeTab === "funded" && fundedResearch.length > 0 && (
          <div className="mt-8 bg-[#225491] rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Funding Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-[#A7C4EC]">
                  {fundedResearch.length}
                </div>
                <div className="text-gray-300">Projects Funded</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-[#A7C4EC]">
                  {fundedResearch.reduce((total, research) => total + (research.fundingAmount || 0), 0).toLocaleString()} ICP
                </div>
                <div className="text-gray-300">Total Invested</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-[#A7C4EC]">
                  {fundedResearch.length > 0 
                    ? Math.round(fundedResearch.reduce((total, research) => total + (research.fundingAmount || 0), 0) / fundedResearch.length).toLocaleString()
                    : 0
                  } ICP
                </div>
                <div className="text-gray-300">Average per Project</div>
              </div>
            </div>
          </div>
        )}

        {/* Additional funding details for funded research */}
        {activeTab === "funded" && fundedResearch.length > 0 && (
          <div className="mt-6 bg-white/5 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4 text-white">Funding Details</h4>
            <div className="space-y-3">
              {fundedResearch.map((research) => (
                <div key={research.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div>
                    <h5 className="font-medium text-white">{research.title}</h5>
                    <p className="text-sm text-gray-400">by {research.author}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[#A7C4EC] font-semibold">{research.fundingAmount?.toLocaleString()} ICP</div>
                    <div className="text-xs text-gray-400">{research.fundingDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}