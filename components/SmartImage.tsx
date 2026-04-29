"use client";
import Image from "next/image";
import { useState } from "react";
import { openLightbox } from "./Lightbox";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  group?: { src: string; caption?: string }[];
  index?: number;
  loading?: "lazy" | "eager";
  /** 종횡비. e.g. "4 / 3" */
  ratio?: string;
  /** 라이트박스 비활성 (그냥 표시만 할 때) */
  noZoom?: boolean;
  /** 우선순위 — LCP 후보 이미지에 사용 */
  priority?: boolean;
  /** 한 화면에서 차지할 비율 — sizes 힌트 */
  sizes?: string;
};

/**
 * next/image 기반 스마트 이미지.
 *  · ASCII 슬러그 파일명 → WebP/AVIF 자동 변환 + srcset 자동 생성
 *  · 클릭 시 라이트박스 (group 으로 묶음 가능)
 *  · 로드 전 fx-skel 스켈레톤 + 로드 후 fade-in
 */
export default function SmartImage({
  src,
  alt,
  caption,
  className = "",
  group,
  index = 0,
  loading = "lazy",
  ratio,
  noZoom,
  priority,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: Props) {
  const [loaded, setLoaded] = useState(false);

  const onClick = () => {
    if (noZoom) return;
    if (group && group.length > 0) {
      openLightbox(group, index);
    } else {
      openLightbox([{ src, caption: caption || alt }], 0);
    }
  };

  const Tag: any = noZoom ? "div" : "button";
  const tagProps = noZoom ? {} : { type: "button", onClick, "aria-label": caption || alt };

  return (
    <Tag
      {...tagProps}
      className={`group relative block w-full overflow-hidden bg-paper ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {!loaded && <div className="absolute inset-0 fx-skel" aria-hidden />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : loading}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`object-cover transition-all duration-700 ease-out
          ${loaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm"}
          ${noZoom ? "" : "group-hover:scale-[1.05]"}`}
      />
      {!noZoom && (
        <>
          <span className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition" />
          <span className="absolute bottom-3 right-3 bg-cream-light text-brand text-[0.72rem] tracking-wider px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0 font-semibold">
            ⤢ 크게 보기
          </span>
        </>
      )}
    </Tag>
  );
}
