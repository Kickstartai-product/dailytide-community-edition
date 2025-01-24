declare global {
  interface Window {
    dataLayer: any[];
  }
}

const sendGTMEvent = (event: string, data: object) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data,
    });
  }
};

export default sendGTMEvent;
