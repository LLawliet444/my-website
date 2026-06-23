"use client";

import { useEffect, useState } from "react";

type ContactButtonProps = {
  email: string;
  wechat: string;
};

export default function ContactButton({ email, wechat }: ContactButtonProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="lets-talk-btn"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>Let&apos;s Talk</span>
        <span className="lets-talk-btn__plane" aria-hidden="true">
          ✈
        </span>
      </button>

      {open && (
        <div
          className="contact-modal"
          role="dialog"
          aria-modal="true"
          aria-label="联系方式"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="contact-modal__card">
            <button
              type="button"
              className="contact-modal__close"
              onClick={() => setOpen(false)}
              aria-label="关闭"
            >
              ×
            </button>

            <h3 className="contact-modal__title">
              <span className="contact-modal__star" aria-hidden="true">★</span>
              <span className="contact-modal__title-text">Nice to meet you!</span>
            </h3>
            <p className="contact-modal__hint">如果你有想法或者合作，欢迎随时联系我～</p>

            <div className="contact-modal__row">
              <div className="contact-modal__icon contact-modal__icon--yellow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="1" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </div>
              <div className="contact-modal__info">
                <span className="contact-modal__label contact-modal__label--yellow">Email</span>
                <a className="contact-modal__value" href={`mailto:${email}`}>
                  {email}
                </a>
              </div>
            </div>

            <hr className="contact-modal__divider" />

            <div className="contact-modal__row">
              <div className="contact-modal__icon contact-modal__icon--green" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.5 4C4.36 4 1 6.69 1 10c0 1.85 1.06 3.49 2.69 4.56L3 17l2.71-1.41c.86.24 1.78.38 2.79.41-.06-.32-.09-.66-.09-1 0-3.31 3.13-6 7-6 .26 0 .51.02.76.04C15.43 6.18 12.27 4 8.5 4z" />
                  <path d="M23 14.5c0-2.49-2.49-4.5-5.5-4.5s-5.5 2.01-5.5 4.5 2.49 4.5 5.5 4.5c.6 0 1.17-.08 1.7-.23L21 20l-.43-1.46C22.21 17.55 23 16.11 23 14.5z" />
                </svg>
              </div>
              <div className="contact-modal__info">
                <span className="contact-modal__label contact-modal__label--green">WeChat</span>
                <span className="contact-modal__value">{wechat}</span>
              </div>
            </div>

            <div className="contact-modal__tape">
              <span className="contact-modal__smiley" aria-hidden="true">☺</span>
              <span className="contact-modal__tape-text">期待一起交流和创造有趣的东西！</span>
              <span className="contact-modal__heart" aria-hidden="true">♡</span>
            </div>

            <span className="contact-modal__deco-arrow" aria-hidden="true">
              <svg viewBox="0 0 60 260" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 48 10 Q 6 60 36 120 T 36 240" />
                <path d="M 28 232 L 36 240 L 44 232" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
