
import React, { useState } from "react";
import { CampaignChannel } from "@/types/campaign";
import {
  BasicInfoSection,
  ContactSelection,
  MediaSection,
  MessageComposerSection,
  PreviewSection,
  ScheduleSection,
  SaveAsTemplateSection,
} from "../CampanhaFormComponents";

interface CampanhaFormContentProps {
  isScheduled: boolean;
  setIsScheduled: (isScheduled: boolean) => void;
  previewChannel: CampaignChannel;
  handleChannelChange: (value: string) => void;
  customerSegments: any[];
}

const CampanhaFormContent: React.FC<CampanhaFormContentProps> = ({
  isScheduled,
  setIsScheduled,
  previewChannel,
  handleChannelChange,
  customerSegments,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        {/* Basic Information Section */}
        <BasicInfoSection 
          customerSegments={customerSegments}
          handleChannelChange={handleChannelChange}
        />
        
        {/* Contact Selection Section */}
        <ContactSelection />
        
        {/* Media Section */}
        <MediaSection />
        
        {/* Schedule Section */}
        <ScheduleSection 
          isScheduled={isScheduled}
          setIsScheduled={setIsScheduled}
        />
        
        {/* Save As Template Section */}
        <SaveAsTemplateSection />
      </div>
      
      <div className="space-y-6">
        {/* Message Composer Section */}
        <MessageComposerSection />
        
        {/* Preview Section */}
        <PreviewSection previewChannel={previewChannel} />
      </div>
    </div>
  );
};

export default CampanhaFormContent;
