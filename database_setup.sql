CREATE TABLE "birds" (
  "Year" integer,
  "Waterfowl_percentage_change" float,
  "Birds_of_prey_percentage_change" float,
  "Wetland_birds_percentage_change" float,
  "Seabirds_percentage_change" float,
  "Forest_birds_percentage_change" float,
  "All_other_birds_percentage_change" float,
  "Shorebirds_percentage_change" float,
  "Grassland_birds_percentage_change" float,
  "Aerial_insectivores_percentage_change" float
);

CREATE TABLE "forests_df_percent" (
  "Country" varchar,
  "Total_1990" float,
  "Total_2000" float,
  "Total_2010" float,
  "Total_2020" float
);

CREATE TABLE "forests_df_total" (
  "Country" varchar,
  "Total_1990" integer,
  "Total_2000" integer,
  "Total_2010" integer,
  "Total_2020" integer,
  "Latitude" float,
  "Longitude" float
);

CREATE TABLE "national" (
  "Status" varchar,
  "Number_of_species" integer
);

CREATE TABLE "regional" (
  "Region" varchar,
  "Critically_imperiled_S1" integer,
  "Imperiled_S2" integer,
  "Vulnerable_S3" integer,
  "Apparently_secure_S4" integer,
  "Secure_S5" integer,
  "Possibly_extirpated_SX" integer,
  "Presumed_extirpated_SH" integer,
  "Unrankable_SU" integer,
  "Unranked_SNR" integer,
  "Not_applicable_SNA" integer,
  "Number_of_species_found_only_in_this_region" integer
);

CREATE TABLE "selected" (
  "Species_group" varchar,
  "Critically_imperiled_N1" integer,
  "Imperiled_N2" integer,
  "Vulnerable_N3" integer,
  "Apparently_secure_N4" integer,
  "Secure_N5" integer,
  "Subtotal_of_species_with_numerical_ranks" integer,
  "Presumed_extirpated_NX" integer,
  "Possibly_extirpated_NH" integer,
  "Unrankable_NU" integer,
  "Unranked_NNR" integer,
  "Not_applicable_NNA" integer,
  "Total" integer
);

CREATE TABLE "species_percent" (
  "Year" integer,
  "National_index_percent_change" float,
  "Bird_index_percent_change" float,
  "Mammal_index_percent_change" float,
  "Fish_index_percent_change" float
);

CREATE TABLE "species" (
  "Year" integer,
  "National_index_percent_change" float,
  "Number_of_species" integer,
  "Bird_index_percent_change" float,
  "Number_of_bird_species" integer,
  "Mammal_index_percent_change" float,
  "Number_of_mammal_species" integer,
  "Fish_index_percent_change" float,
  "Number_of_fish_species" integer
);