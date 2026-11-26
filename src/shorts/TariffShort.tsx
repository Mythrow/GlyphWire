import React from "react";
import { TopicShort } from "./TopicShort";
import type { TopicShortProps } from "./topicTypes";
import preview from "../../stories/tariff-preview.json";

// Historical visual proof, with provisional timing and placeholder partners.
export const tariffPreview = preview as TopicShortProps;
export const TariffShort: React.FC = () => <TopicShort {...tariffPreview} />;
