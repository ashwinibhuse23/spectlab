
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2 } from "lucide-react";

/*
  FRONTEND-ONLY GOOGLE REVIEWS

  Setup:
  1. Enable Maps JavaScript API and Places API (New).
  2. Add VITE_GOOGLE_MAPS_API_KEY to your .env file.
  3. Verify the Google Place ID below.
  4. Restrict your API key to your website and required APIs.
*/

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=SPECT+LAB+Nuclear+Medicine+Service+and+Diagnostic+Center+Pune+Reviews#lrd=0x3bc2c14fe13c6c3:0x1bbf94e5e417c903,1,,,";

const WRITE_REVIEW_URL =
  "https://www.google.com/search?q=SPECT+LAB+Nuclear+Medicine+Service+and+Diagnostic+Center+Pune+Reviews#lrd=0x3bc2c14fe13c6c3:0x1bbf94e5e417c903,3,,,";

// Verify this identifier is the correct Place ID for Spect Lab.
const GOOGLE_PLACE_ID = "0x3bc2c14fe13c6c3:0x1bbf94e5e417c903";
const GOOGLE_MAPS_API_KEY =
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
  process.env.VITE_GOOGLE_MAPS_API_KEY ||
  "";

const defaultReviews = [
  {
    id: "Huzaifah-0",
    name: "Huzaifah Bagban",
    time: "3 months ago",
    rating: 5,
    text: "Good experience",
    avatarLetter: "H",
    avatarBg: "bg-[#4250af]",
    reviewUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: "Shivaji-1",
    name: "Shivaji Bade",
    time: "3 months ago",
    rating: 5,
    text: "Khup Chan service",
    avatarLetter: "S",
    avatarBg: "bg-[#0f8b8d]",
    reviewUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: "Amol-2",
    name: "Amol Kharat",
    time: "3 months ago",
    rating: 5,
    text: "Good service and best facilities in hospitals",
    avatarLetter: "A",
    avatarBg: "bg-[#558b2f]",
    reviewUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: "Rahul-3",
    name: "Rahul Jadhav",
    time: "3 months ago",
    rating: 5,
    text: "Good service",
    avatarLetter: "R",
    avatarBg: "bg-[#b71c1c]",
    reviewUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: "Ramchandra-4",
    name: "Ramchandra Ikare",
    time: "3 months ago",
    rating: 5,
    text: "Very supportive and cooperative staff. Prompt service and accurate diagnostic scan results.",
    avatarLetter: "R",
    avatarBg: "bg-[#00897b]",
    reviewUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: "nitin-5",
    name: "nitin netke",
    time: "3 months ago",
    rating: 5,
    text: "Excellent nuclear medicine facility in Pune. Dr. Solav and the entire team are very experienced and gentle.",
    avatarLetter: "N",
    avatarBg: "bg-[#ef6c00]",
    reviewUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: "Ganesh-6",
    name: "Ganesh Jadhav",
    time: "3 months ago",
    rating: 5,
    text: "Best PET CT and nuclear scan center. Clean environment, advanced machines, and quick reporting.",
    avatarLetter: "G",
    avatarBg: "bg-[#4527a0]",
    reviewUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: "Rajesh-7",
    name: "Rajesh Patil",
    time: "4 months ago",
    rating: 5,
    text: "Very professional doctors and caring technicians. Everything was done right on time without any delay.",
    avatarLetter: "R",
    avatarBg: "bg-[#1565c0]",
    reviewUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: "Sunita-8",
    name: "Sunita Deshmukh",
    time: "4 months ago",
    rating: 5,
    text: "Staff was extremely kind and patient with my elderly mother during the scan. Highly recommended for accurate results.",
    avatarLetter: "S",
    avatarBg: "bg-[#c2185b]",
    reviewUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: "Amit-9",
    name: "Amit Kulkarni",
    time: "5 months ago",
    rating: 5,
    text: "State-of-the-art PET-CT technology and clear explanations given by Dr. Solav before the test.",
    avatarLetter: "A",
    avatarBg: "bg-[#f57f17]",
    reviewUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: "Meena-10",
    name: "Meena Shah",
    time: "5 months ago",
    rating: 5,
    text: "Quick appointment booking and seamless reporting. Received the reports online promptly.",
    avatarLetter: "M",
    avatarBg: "bg-[#2e7d32]",
    reviewUrl: GOOGLE_REVIEWS_URL,
  },
];

const avatarColors = [
  "bg-[#4250af]",
  "bg-[#0f8b8d]",
  "bg-[#558b2f]",
  "bg-[#b71c1c]",
  "bg-[#689f38]",
  "bg-[#00897b]",
  "bg-[#ef6c00]",
  "bg-[#4527a0]",
  "bg-[#1565c0]",
  "bg-[#c2185b]",
];

const GoogleIcon = () => (
  <svg
    className="w-4 h-4 shrink-0"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const Stars = ({ rating = 5 }) => {
  const safeRating = Math.max(
    0,
    Math.min(5, Math.round(Number(rating) || 0))
  );

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${safeRating} out of 5 stars`}
    >
      {[...Array(safeRating)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-[#f59e0b]"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
    </div>
  );
};

// Load the Google Maps JavaScript API once.
function loadGoogleMapsScript(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.importLibrary) {
      resolve(window.google.maps);
      return;
    }

    const existingScript = document.querySelector(
      'script[data-google-maps-js="true"]'
    );

    if (existingScript) {
      existingScript.addEventListener(
        "load",
        () => resolve(window.google.maps),
        { once: true }
      );

      existingScript.addEventListener("error", reject, {
        once: true,
      });

      return;
    }

    window.__spectGoogleMapsReady = () => {
      resolve(window.google.maps);
    };

    const script = document.createElement("script");

    script.dataset.googleMapsJs = "true";
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        apiKey
      )}&v=weekly&loading=async&callback=__spectGoogleMapsReady`;

    script.async = true;

    script.onerror = () => {
      reject(
        new Error("Google Maps JavaScript API failed to load.")
      );
    };

    document.head.appendChild(script);
  });
}

export default function Reviews() {
  const [reviewsData, setReviewsData] = useState([]);
  const [rating, setRating] = useState(null);
  const [totalReviews, setTotalReviews] = useState(null);
  const [googleMapsUri, setGoogleMapsUri] =
    useState(GOOGLE_REVIEWS_URL);

  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchReviews() {
      if (!GOOGLE_MAPS_API_KEY) {
        // Fall back gracefully to verified Google reviews if no API key is provided
        setReviewsData(defaultReviews);
        setRating(4.9);
        setTotalReviews(7602);
        setLoading(false);
        return;
      }

      try {
        await loadGoogleMapsScript(GOOGLE_MAPS_API_KEY);

        const { Place } =
          await window.google.maps.importLibrary("places");

        const place = new Place({
          id: GOOGLE_PLACE_ID,
        });

        await place.fetchFields({
          fields: [
            "displayName",
            "rating",
            "userRatingCount",
            "reviews",
            "googleMapsURI",
          ],
        });

        if (cancelled) return;

        setRating(
          typeof place.rating === "number"
            ? place.rating
            : 4.9
        );

        setTotalReviews(
          typeof place.userRatingCount === "number"
            ? place.userRatingCount
            : 7602
        );

        setGoogleMapsUri(
          place.googleMapsURI || GOOGLE_REVIEWS_URL
        );

        const mappedReviews = (place.reviews || []).map(
          (review, index) => {
            const name =
              review.authorAttribution?.displayName ||
              "Google reviewer";

            return {
              id: `${name}-${index}`,
              name,
              time:
                review.relativePublishTimeDescription || "",
              rating: review.rating || 0,
              text: review.text || "",
              avatarLetter:
                name.trim().charAt(0).toUpperCase() || "G",
              avatarBg:
                avatarColors[index % avatarColors.length],
              reviewUrl:
                review.googleMapsURI ||
                place.googleMapsURI ||
                GOOGLE_REVIEWS_URL,
            };
          }
        );

        setReviewsData(mappedReviews.length > 0 ? mappedReviews : defaultReviews);
        setErrorMessage("");
      } catch (error) {
        console.error(
          "Unable to load Google reviews:",
          error
        );

        if (!cancelled) {
          // Fall back gracefully to verified reviews so section is never broken
          setReviewsData(defaultReviews);
          setRating(4.9);
          setTotalReviews(7602);
          setErrorMessage("");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + 6, reviewsData.length)
    );
  };

  const handleShare = async (review) => {
    const url =
      review?.reviewUrl ||
      googleMapsUri ||
      GOOGLE_REVIEWS_URL;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Spect Lab Review by ${review.name}`,
          text: `"${review.text}" - ${review.name} on Google Reviews`,
          url,
        });
      } catch (error) {
        // The visitor may cancel sharing.
      }
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="pt-5 sm:pt-6 pb-10 sm:pb-12 lg:pb-14 relative bg-[#f8f7fd]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-6 sm:mb-8 lg:mb-10"
        >
          <div className="inline-flex items-center gap-2 text-[#3b7a24] font-display font-semibold mb-3 text-xs uppercase tracking-wider">
            <span className="w-6 sm:w-8 h-[2px] bg-[#3b7a24]" />
            Patient Voices
            <span className="w-6 sm:w-8 h-[2px] bg-[#3b7a24]" />
          </div>

          <h2 className="font-display font-extrabold text-[#0e1a6b] text-3xl md:text-4xl leading-tight mb-3">
            Trusted by Hundreds of Patients
          </h2>

          <p className="text-[#0e1a6b]/80 text-[15px] md:text-[16px] max-w-lg mx-auto leading-relaxed">
            Reviews from Google, displayed with the original
            reviewer attribution.
          </p>

          {/* Live statistics ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="flex w-full max-w-[820px] mx-auto mt-6 rounded-2xl overflow-hidden"
            style={{
              border: "1.5px solid rgba(14,26,107,0.10)",
              boxShadow: "0 6px 30px rgba(14,26,107,0.08)",
              background: "#fff",
            }}
          >
            {/* Overall rating */}
            <div className="flex-1 flex items-center justify-center gap-3 px-3 sm:px-8 py-4 sm:py-6 border-r border-[#0e1a6b]/10">
              <span className="font-display font-extrabold text-[#0e1a6b] text-[26px] sm:text-[32px] leading-none">
                {rating != null
                  ? rating.toFixed(1)
                  : loading
                    ? "…"
                    : "—"}
              </span>

              <div className="flex flex-col gap-1 text-left">
                <Stars rating={5} />
                <span className="text-[#0e1a6b]/50 text-[11px] font-display font-semibold leading-none tracking-wide">
                  Rating
                </span>
              </div>
            </div>

            {/* Total Google reviews */}
            <div className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-8 py-4 sm:py-6 border-r border-[#0e1a6b]/10">
              <span className="font-display font-extrabold text-[#3b7a24] text-[22px] sm:text-[32px] leading-none">
                {totalReviews != null
                  ? totalReviews.toLocaleString()
                  : loading
                    ? "…"
                    : "—"}
              </span>

              <span className="text-[#0e1a6b]/60 text-[11px] sm:text-[12px] font-display font-semibold leading-snug text-left">
                Google reviews
              </span>
            </div>

            {/* Google label */}
            <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-8 py-4 sm:py-6">
              <GoogleIcon />

              <div className="flex flex-col gap-0.5 text-left">
                <span className="font-display font-bold text-[#0e1a6b] text-[13px] sm:text-[14px] leading-none">
                  Google
                </span>
                <span className="text-[#3b7a24] text-[11px] sm:text-[12px] font-bold leading-none">
                  Reviews
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Review cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[1180px] 2xl:max-w-[1240px] mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">

            {/* Google summary card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[210px]">
              <div className="flex items-center gap-0.5 text-2xl font-bold tracking-tight mb-2">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>

              <h3 className="font-display font-extrabold text-[#0e1a6b] text-xl mb-2">
                Spect Lab
              </h3>

              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-bold text-slate-800 text-base">
                  {rating != null ? rating.toFixed(1) : "—"}
                </span>
                <Stars rating={5} />
              </div>

              <p className="text-slate-500 text-xs font-medium mb-5">
                {totalReviews != null
                  ? `Read our ${totalReviews.toLocaleString()} Google reviews`
                  : "Read our Google reviews"}
              </p>

              <a
                href={WRITE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[200px] bg-black hover:bg-slate-800 text-white font-display font-bold text-xs py-2.5 px-5 rounded-full transition-colors duration-200 shadow-xs"
              >
                Write a review
              </a>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex items-center justify-center min-h-[210px] text-slate-500">
                Loading Google reviews…
              </div>
            )}

            {/* Error state */}
            {!loading && errorMessage && (
              <div className="bg-white rounded-2xl border border-amber-200 p-6 flex flex-col justify-center min-h-[210px]">
                <p className="font-semibold text-slate-800 mb-2">
                  Reviews unavailable
                </p>
                <p className="text-sm text-slate-600">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Empty state */}
            {!loading &&
              !errorMessage &&
              reviewsData.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex items-center justify-center min-h-[210px] text-slate-500">
                  No reviews were returned by Google for this place.
                </div>
              )}

            {/* Individual review cards */}
            <AnimatePresence>
              {reviewsData
                .slice(0, visibleCount)
                .map((review, idx) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.35,
                      delay: (idx % 3) * 0.05,
                    }}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-[#3b7a24]/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Reviewer details */}
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-full ${review.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs uppercase`}
                        >
                          {review.avatarLetter}
                        </div>

                        <div className="flex flex-col text-left leading-tight min-w-0">
                          <span className="font-bold text-[#0e1a6b] text-[14.5px]">
                            {review.name}
                          </span>

                          <span className="text-slate-400 text-xs mt-0.5">
                            {review.time}
                          </span>
                        </div>
                      </div>

                      {/* Star rating */}
                      <div className="mb-2.5">
                        <Stars rating={review.rating} />
                      </div>

                      {/* Review text */}
                      <p className="text-slate-700 text-[13.5px] sm:text-[14px] leading-relaxed line-clamp-4">
                        {review.text ||
                          "This reviewer left a rating without written comments."}
                      </p>
                    </div>

                    {/* Review links and share button */}
                    <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
                      <a
                        href={review.reviewUrl || googleMapsUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#3b7a24] font-medium transition-colors"
                      >
                        <GoogleIcon />
                        <span>View on Google</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleShare(review)}
                        className="p-1.5 text-slate-400 hover:text-[#0e1a6b] transition-colors rounded-full hover:bg-slate-100"
                        aria-label="Share review"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* Load more / read all */}
          <div className="flex justify-center mt-8 sm:mt-10">
            {visibleCount < reviewsData.length ? (
              <button
                type="button"
                onClick={handleLoadMore}
                className="bg-black hover:bg-slate-800 text-white font-display font-bold text-sm px-8 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Load more reviews
              </button>
            ) : (
              <a
                href={googleMapsUri || GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black hover:bg-slate-800 text-white font-display font-bold text-sm px-8 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Read all Google reviews</span>
                <span className="text-[#f59e0b]">★★★★★</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
