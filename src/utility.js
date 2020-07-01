import React from 'react'

export function filterResults(input, restaurants) {
  let list = restaurants
    .filter((r) => {
      if (input.length < 2) {
        delete r.nameSearch;
        delete r.neighborhoodSearch;
        delete r.cuisineSearch;
        return true;
      }

      if (r.name.toLowerCase().indexOf(input) !== -1) {
        r.nameSearch = '<span class="search-match">' + r.name + '</span>';
        return true;
      } else {
        delete r.nameSearch;
      }

      if (r.neighborhood.toLowerCase().indexOf(input) !== -1) {
        r.neighborhoodSearch = '<span class="search-match">' + r.neighborhood + '</span>';
        return true;
      } else {
        delete r.neighborhoodSearch;
      }

      if (r.cuisine && r.cuisine.toLowerCase().indexOf(input) !== -1) {
        r.cuisineSearch = '<span class="search-match">' + r.cuisine + '</span>';
        return true;
      } else {
        delete r.cuisineSearch;
      }
    })
    .sort(function(a, b) {
        let nameA = a && a.name && a.name.toLowerCase();
        let nameB = b && b.name && b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }
    )
    .map((r, idx) => {
        let listing = '';

        if (r.name !== undefined && r.nameSearch) {
          listing += r.nameSearch;
        } else if (r.name !== undefined) {
          listing += r.name;
        }

        if (r.neighborhood !== undefined && r.neighborhoodSearch) {
          listing += ' | ' + r.neighborhoodSearch;
        } else if (r.neighborhood !== undefined) {
          listing += ' | ' + r.neighborhood;
        }

        if (r.cuisine !== undefined && r.cuisineSearch) {
          listing += ' | ' + r.cuisineSearch
        } else if (r.cuisine !== undefined) {
          // sometimes data pt "cuisine" not provided
          listing += ' | ' + r.cuisine;
        }

        return (
            <li
              key={idx}
              dangerouslySetInnerHTML={{
                __html: listing
              }}
              >
            </li>
        )
    });

    return list;
}
