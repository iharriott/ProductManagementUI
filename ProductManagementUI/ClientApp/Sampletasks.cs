using System.Collections.Generic;
using GEICO.TieringAndRating.Characteristics.Models;

namespace Geico.Apollo.NextGenRating.API.Contracts
{
    /// <summary>
    /// The GetRateRequest class.
    /// </summary>
    public class GetRateRequest
    {
        /// <summary>
        /// Gets or sets the Product Id.
        /// </summary>
        public string ProductId { get; set; }

        /// <summary>
        /// Gets or sets the request id.
        /// </summary>
        public string RequestId { get; set; }

        /// <summary>
        /// Gets or sets the prior-term Product Id.
        /// </summary>
        public string PriorTermProductId { get; set; }

        /// <summary>
        /// Gets or sets the entities.
        /// </summary>
        public List<Entity> Entities { get; set; }

        public List<GEICO.TieringAndRating.Characteristics.Models.Entity> ToEntities()
        {
            var retVal = new List<GEICO.TieringAndRating.Characteristics.Models.Entity>();

            foreach (var entity in this.Entities)
            {
                var gtrEntity = new GEICO.TieringAndRating.Characteristics.Models.Entity(entity.EntityType, entity.Id, entity.Ordinal, entity.Characteristics, new List<RelatedEntity>());
                gtrEntity.AddCoverages(entity.Coverages);
                retVal.Add(gtrEntity);
            }

            return retVal;
        }

        /// <summary>
        /// Entity.
        /// </summary>
        public class Entity
        {
            /// <summary>
            /// Gets or sets the EntityType.
            /// </summary>
            public string EntityType { get; set; }

            /// <summary>
            /// Gets or sets the identifier.
            /// </summary>
            public string Id { get; set; }

            /// <summary>
            /// Gets or sets the identifier.
            /// </summary>
            public int? Ordinal { get; set; }

            /// <summary>
            /// Gets or sets the data.
            /// </summary>
            public Dictionary<string, ValueBox> Characteristics { get; set; }

            /// <summary>
            /// Gets or sets the coverages.
            /// </summary>
            public List<Coverage> Coverages { get; set; } = new List<Coverage>();
        }
    }
}
