export const mockAiProvider = {
  generateProposals: async (
    checklistFindings: string,
    price: number
  ): Promise<Array<{ level: string; scope: string; price: number }>> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        level: 'good',
        scope: 'Repair refrigerant leak and recharge system',
        price: price,
      },
      {
        level: 'better',
        scope:
          'Repair leak, recharge, replace capacitor, and perform preventive maintenance',
        price: price * 1.3,
      },
      {
        level: 'best',
        scope:
          'Replace entire compressor unit, upgrade to high-efficiency system with extended warranty',
        price: price * 2.2,
      },
    ];
  },

  generateFindings: async (checklistData: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const findings = [
      'System operating normally. All components checked and functioning within specifications.',
      'Refrigerant charge is slightly low. Recommend recharge to restore optimal cooling performance.',
      'Blower motor showing early signs of wear. Recommend replacement within 3-6 months.',
      'Condenser coil showing minor debris accumulation. Cleaning recommended to improve efficiency.',
      'Multiple component failures detected. System repair urgent to prevent complete breakdown.',
    ];

    return findings[Math.floor(Math.random() * findings.length)];
  },

  generateSalesCoaching: async (
    coachingType: string,
    issueDescription: string
  ): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const coachingResponses: Record<string, string> = {
      how_to_explain: `Here's how to explain this to your customer:

"The system inspection revealed ${issueDescription}. This is affecting your comfort and energy efficiency. The good news is we have repair options ranging from a basic fix to a full system upgrade that would give you the best long-term value."`,

      objection_handling: `Handle objections like this:

Customer: "Can't we just fix it cheaply?"
You: "We could temporarily patch it, but that typically leads to repeat service calls and higher costs. Our recommended solution prevents future problems."

Customer: "I need to think about it"
You: "Absolutely, take your time. Just know that waiting can make the problem worse. Should I schedule a follow-up call to answer questions?"`,

      how_to_close: `Use this closing approach:

"Based on what we found, I'd recommend starting with the Better option. It addresses the immediate issue and prevents future problems. Should we move forward with scheduling that this week?"

- Give specific recommendation
- Show the best value option
- Create urgency with next steps
- Ask for commitment`,
    };

    return (
      coachingResponses[coachingType] ||
      'Practice your pitch and stay confident in your recommendations.'
    );
  },

  generateNextAction: async (leadData: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const actions = [
      'Call customer within 2 hours while interest is fresh',
      'Send proposal and schedule follow-up call for next day',
      'Text appointment confirmation 24 hours before scheduled visit',
      'Follow up on lost opportunity with special offer',
      'Schedule comprehensive quote visit',
    ];

    return actions[Math.floor(Math.random() * actions.length)];
  },
};
