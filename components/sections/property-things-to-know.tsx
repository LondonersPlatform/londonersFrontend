import { Button } from "@/components/ui/button";
import HouseRulesModal from "../listings/house-rules-modal";
import CancellationPolicyModal from "../listings/cancellation-policy-modal";
import SafetyPropertyModal from "../listings/safety-property-modal";

export function PropertyThingsToKnow({ title, sections }: any) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((section: any, index: number) => (
          <div key={index} className="space-y-4">
            <h3 className="font-bold">{section.title}</h3>

            {section.isParagraph ? (
              <p className="text-sm text-gray-700">{section.items[0]}</p>
            ) : (
              <ul className="space-y-2 text-sm text-gray-700">
                {section.items.map((item: any, itemIndex: number) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            )}
            {index == 0 && <HouseRulesModal section={section} />}
            {index == 2 && <CancellationPolicyModal />}
            {index == 1 && <SafetyPropertyModal />}
          </div>
        ))}
      </div>
    </div>
  );
}

// Example usage:
// <PropertyThingsToKnow /> will use the dummy data
// <PropertyThingsToKnow title="Custom Title" sections={customSections} /> will use custom
