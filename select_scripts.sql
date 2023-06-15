SELECT "Year", "Waterfowl_percentage_change", "Birds_of_prey_percentage_change", "Wetland_birds_percentage_change", "Seabirds_percentage_change", "Forest_birds_percentage_change", "All_other_birds_percentage_change", "Shorebirds_percentage_change", "Grassland_birds_percentage_change", "Aerial_insectivores_percentage_change"
	FROM public.birds;

SELECT "Country", "Total_1990", "Total_2000", "Total_2010", "Total_2020"
	FROM public.forests_df_percent;

SELECT "Country", "Total_1990", "Total_2000", "Total_2010", "Total_2020", "Latitude", "Longitude"
	FROM public.forests_df_total;
	
SELECT "Year", "National_index_percent_change", "Bird_index_percent_change", "Mammal_index_percent_change", "Fish_index_percent_change"
	FROM public.species_percent;

SELECT "Status", "Number_of_species"
	FROM public."national";
	
SELECT "Region", "Critically_imperiled_S1", "Imperiled_S2", "Vulnerable_S3", "Apparently_secure_S4", "Secure_S5", "Possibly_extirpated_SX", "Presumed_extirpated_SH", "Unrankable_SU", "Unranked_SNR", "Not_applicable_SNA", "Number_of_species_found_only_in_this_region"
	FROM public.regional;
	
SELECT "Species_group", "Critically_imperiled_N1", "Imperiled_N2", "Vulnerable_N3", "Apparently_secure_N4", "Secure_N5", "Subtotal_of_species_with_numerical_ranks", "Presumed_extirpated_NX", "Possibly_extirpated_NH", "Unrankable_NU", "Unranked_NNR", "Not_applicable_NNA", "Total"
	FROM public.selected;
	
SELECT "Year", "National_index_percent_change", "Number_of_species", "Bird_index_percent_change", "Number_of_bird_species", "Mammal_index_percent_change", "Number_of_mammal_species", "Fish_index_percent_change", "Number_of_fish_species"
	FROM public.species;

SELECT "Year", "National_index_percent_change", "Bird_index_percent_change", "Mammal_index_percent_change", "Fish_index_percent_change"
	FROM public.species_percent;