import {
  ResultHero,
  ResultBreakdown,
  ResultCTA,
} from "../components/results";
import AppHeader from '../components/layout/AppHeader.jsx';

function ResultPage() {
  // Example backend response
  const quizScore = 18;
  const quizTotal = 20;

  const codingScore = 16;
  const codingTotal = 20;

  const overall =
    (quizScore / quizTotal + codingScore / codingTotal) / 2;

  const passed = overall >= 0.6;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader />
      <ResultHero
        quizScore={quizScore}
        quizTotal={quizTotal}
        codingScore={codingScore}
        codingTotal={codingTotal}
      />

      <ResultBreakdown
        quizScore={quizScore}
        quizTotal={quizTotal}
        codingScore={codingScore}
        codingTotal={codingTotal}
      />

      <ResultCTA
        passed={passed}
        onJourney={() => console.log("Navigate to journey page")}
      />
    </div>
  );
}

export default ResultPage;
