import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import { PlacesSorting } from './places-sorting';

interface PlacesProps {
  city: string;
  offers: Offer[];
}

const Places = ({ city, offers }: PlacesProps): JSX.Element => (
  <div className="cities__places-container container">
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{`${offers.length} places to stay in ${city}`}</b>
      <PlacesSorting />
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) =>
          <PlaceCard key={offer.id} className='cities__card' {...offer} />
        )}
      </div>
    </section>
    <div className="cities__right-section">
      <section className="cities__map map"></section>
    </div>
  </div>
);

export default Places;
