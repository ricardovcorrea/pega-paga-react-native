using System;
using System.Collections;
using System.Collections.Generic;
using Api.Configurations;
using Api.DTO;
using GoogleApi;
using GoogleApi.Entities.Common.Enums;
using GoogleApi.Entities.Common;
using GoogleApi.Entities.Places.Search.Text.Request;
using GoogleApi.Entities.Places.Search.Text.Response;
using GoogleApi.Entities.Places.Details.Request;
using GoogleApi.Entities.Places.Details.Response;
using GoogleApi.Entities.Places.Details.Request.Enums;
using GoogleApi.Entities.Maps.Geocoding;
using GoogleApi.Entities.Maps.Geocoding.Address.Request;

namespace Api.Infrastructure
{
    public interface IGooglePlaces
    {
        DTOResponse<PlacesTextSearchResponse> TextSearch(double latitude, double longitude, int language, string terms, int radius, string pageToken);
        DTOResponse<PlacesDetailsResponse> GetPlaceDetail(string placeId);
        DTOResponse<GeocodeResponse> GeocodeAddress(string country, string state, string city, string street, string number, string postalCode);
    }

    public class GooglePlaces : IGooglePlaces
    {
        private readonly IGeneralSettings _generalSettings;

        public GooglePlaces(IGeneralSettings generalSettings)
        {
            _generalSettings = generalSettings;
        }

        public DTOResponse<PlacesTextSearchResponse> TextSearch(double latitude, double longitude,int language, string terms, int radius, string pageToken)
        {
            var queryLocation = new Location(latitude, longitude);

            var textQuery = new PlacesTextSearchRequest()
            {
                Key = _generalSettings.GoogleApiKey,
                Location = queryLocation,
                Query = terms,
                Language = (Language)language,
                Radius = radius
            };

            if(!string.IsNullOrWhiteSpace(pageToken))
            {
                textQuery.PageToken = pageToken;
            }

            var textQueryResult = GoogleApi.GooglePlaces.TextSearch.Query(textQuery);

            if (!textQueryResult.Status.HasValue || textQueryResult.Status.Value != Status.Ok)
            {
                return new DTOResponse<PlacesTextSearchResponse>()
                {
                    Code = 400,
                    Message = textQueryResult.ErrorMessage
                };
            }

            return new DTOResponse<PlacesTextSearchResponse>()
            {
                Code = 200,
                Data = textQueryResult
            };
        }

        public DTOResponse<PlacesDetailsResponse> GetPlaceDetail(string placeId)
        {

            var basicDetailsQuery = new PlacesDetailsRequest()
            {
                Key = _generalSettings.GoogleApiKey,
                PlaceId = placeId,
                Fields = FieldTypes.Basic
            };


            var detailsQueryResult = GoogleApi.GooglePlaces.Details.Query(basicDetailsQuery);

            if (!detailsQueryResult.Status.HasValue || detailsQueryResult.Status.Value != Status.Ok)
            {
                return new DTOResponse<PlacesDetailsResponse>()
                {
                    Code = 400,
                    Message = detailsQueryResult.ErrorMessage
                };
            }

            var contactDetailsQuery = new PlacesDetailsRequest()
            {
                Key = _generalSettings.GoogleApiKey,
                PlaceId = placeId,
                Fields = FieldTypes.Contact
            };

            var contactDetailsQueryResult = GoogleApi.GooglePlaces.Details.Query(contactDetailsQuery);

            if(contactDetailsQueryResult.Status.HasValue && contactDetailsQueryResult.Status == Status.Ok)
            {
                detailsQueryResult.Result.FormattedPhoneNumber = contactDetailsQueryResult.Result.FormattedPhoneNumber;
                detailsQueryResult.Result.Website = contactDetailsQueryResult.Result.Website;
            }

            return new DTOResponse<PlacesDetailsResponse>()
            {
                Code = 200,
                Data = detailsQueryResult
            };
        }

        public DTOResponse<GeocodeResponse> GeocodeAddress(string country, string state, string city, string street, string number, string postalCode)
        {
            var addressComponents = new List<KeyValuePair<Component, string>>();

            addressComponents.Add(new KeyValuePair<Component, string>(Component.Administrative_Area, city));
            addressComponents.Add(new KeyValuePair<Component, string>(Component.Administrative_Area, state));
            addressComponents.Add(new KeyValuePair<Component, string>(Component.Postal_Code, postalCode));
            addressComponents.Add(new KeyValuePair<Component, string>(Component.Country, country));

            var addressGeocodeQueryResult = GoogleApi.GoogleMaps.AddressGeocode.Query(new AddressGeocodeRequest()
            {
                Key = _generalSettings.GoogleApiKey,
                Components = addressComponents,
                Address = number + " " + street
            });

            if (!addressGeocodeQueryResult.Status.HasValue || addressGeocodeQueryResult.Status.Value != Status.Ok)
            {
                return new DTOResponse<GeocodeResponse>()
                {
                    Code = 400,
                    Message = addressGeocodeQueryResult.ErrorMessage
                };
            }

            return new DTOResponse<GeocodeResponse>()
            {
                Code = 200,
                Data = addressGeocodeQueryResult
            };
        }
    }
}
