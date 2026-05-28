import "./CampaignCard.css";

export default function CampaignCard({ campaign }: any) {

  const progress =
    (campaign.raisedAmount / campaign.amount) * 100;

  return (
    <div className="campaignCard">

      <img
        src={campaign.image}
        alt={campaign.title}
        className="campaignImage"
      />

      <div className="campaignContent">

        <h3>{campaign.title}</h3>

        <p>{campaign.story}</p>

        <div className="campaignStats">
          <span>
            ₹{campaign.raisedAmount}
          </span>

          <span>
            Goal ₹{campaign.amount}
          </span>
        </div>

        <div className="progressBar">
          <div
            className="progressFill"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

    </div>
  );
}