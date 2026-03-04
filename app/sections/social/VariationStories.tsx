"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./VariationStories.module.css";

const STORIES = [
  { id: 0, video: "/social/story-1.mp4",  username: "@numastays" },
  { id: 1, video: "/social/story-2.mp4",  username: "@numastays" },
  { id: 2, video: "/social/story-3.mov",  username: "@numastays" },
];

export default function SocialStoriesSection() {
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goTo = (idx: number) => {
    setProgress(0);
    setCurrent(Math.max(0, Math.min(idx, STORIES.length - 1)));
  };

  // Sync muted state to video element
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, current]);

  // Reset + play when story changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [current]);

  // Track progress for the progress bar
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress(v.currentTime / v.duration);
  };

  // Auto-advance on video end
  const handleEnded = () => {
    if (current < STORIES.length - 1) {
      goTo(current + 1);
    } else {
      goTo(0);
    }
  };

  const story = STORIES[current];

  return (
    <section className={styles.section}>

      {/* Headline */}
      <h2 className={styles.heading}>
        Warning: your stay may cause excessive posting
      </h2>

      {/* ── Central story card ── */}
      <div className={styles.storyCard}>

        {/* Progress bars */}
        <div className={styles.progressBars}>
          {STORIES.map((s, i) => (
            <div key={s.id} className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{
                  width: i < current ? "100%" : i === current ? `${progress * 100}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Video */}
        <video
          ref={videoRef}
          key={story.id}
          className={styles.storyVideo}
          src={story.video}
          autoPlay
          playsInline
          muted={muted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />

        {/* Profile header */}
        <div className={styles.profileHeader}>
          <div className={styles.avatarRing}>
            <div className={styles.avatar} />
          </div>
          <span className={styles.username}>{story.username}</span>
        </div>

        {/* Tap zones: left = prev, right = next */}
        <button className={`${styles.tapZone} ${styles.tapLeft}`}  onClick={() => goTo(current - 1)} aria-label="Previous story" />
        <button className={`${styles.tapZone} ${styles.tapRight}`} onClick={() => goTo(current + 1)} aria-label="Next story" />

        {/* Mute / unmute */}
        <button
          className={styles.muteBtn}
          type="button"
          aria-label={muted ? "Unmute" : "Mute"}
          onClick={() => setMuted((m) => !m)}
        >
          {muted ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.62 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.52C15.58 18.04 14.83 18.45 14 18.7V20.76C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" fill="white"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="white"/>
            </svg>
          )}
        </button>

      </div>

      {/* ── Decorative collage images ── */}
      <div className={`${styles.collage} ${styles.collage1}`} style={{ backgroundImage: "url(/social/collage-1.jpg)" }} />
      <div className={`${styles.collage} ${styles.collage2}`} style={{ backgroundImage: "url(/social/collage-2.jpg)" }} />
      <div className={`${styles.collage} ${styles.collage3}`} style={{ backgroundImage: "url(/social/collage-3.jpg)" }} />
      <div className={`${styles.collage} ${styles.collage4}`} style={{ backgroundImage: "url(/social/collage-4.jpg)" }} />

    </section>
  );
}
