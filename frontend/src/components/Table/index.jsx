import React from 'react'

import MaterialTable from "material-table";

import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale } from 'react-datepicker';
registerLocale('pt', ptBR);

function Table({
  columns,
  components,
  data,
  detailPanel,
  editable,
  handleCreate,
  handleEdit,
  handleDelete,
  localizationBody,
  options,
  title,
}) {
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      detailPanel={detailPanel}
      editable={editable}
      localization={{
        body: localizationBody,
        dateTimePickerLocalization: ptBR,
        toolbar: {
          searchTooltip: "Pesquisar",
          searchPlaceholder: "Pesquisar",
        },
        pagination: {
          labelRowsSelect: "linhas",
          labelDisplayedRows: "{from}-{to} de {count} registros",
          firstTooltip: "Primeira página",
          previousTooltip: "Página anterior",
          nextTooltip: "Próxima página",
          lastTooltip: "Última página",
        },
        header: {
          actions: "Ações",
        },
      }}
      options={options}
      components={components}
    />
  )
}

export default Table;
